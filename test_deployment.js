#!/usr/bin/env node
/**
 * Kalorienrechner Deployment Test Suite
 * Automated testing for live PWA deployment
 * 
 * Usage: node test_deployment.js [URL]
 * Example: node test_deployment.js https://gtt4kmhbvp-code.github.io/kalorienrechner
 */

const https = require('https');
const url = require('url');

// ANSI colors for output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    bold: '\x1b[1m'
};

const log = {
    pass: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
    fail: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
    warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    section: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}\n`)
};

class DeploymentTester {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0
        };
    }

    async httpRequest(pathname) {
        return new Promise((resolve, reject) => {
            const options = {
                method: 'GET',
                timeout: 5000,
                rejectUnauthorized: false
            };

            const fullUrl = new URL(pathname, this.baseUrl);
            const request = https.request(fullUrl, options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: data,
                        contentType: res.headers['content-type']
                    });
                });
            });

            request.on('error', reject);
            request.on('timeout', () => {
                request.destroy();
                reject(new Error('Request timeout'));
            });

            request.end();
        });
    }

    async testSiteAccess() {
        log.section('Phase 1: Site Access & Loading');
        
        try {
            const response = await this.httpRequest('/');
            
            if (response.status === 200) {
                log.pass('Site loads successfully (HTTP 200)');
                this.results.passed++;
            } else {
                log.fail(`Unexpected status code: ${response.status}`);
                this.results.failed++;
            }

            if (response.contentType && response.contentType.includes('text/html')) {
                log.pass('Content-Type is HTML');
                this.results.passed++;
            } else {
                log.warn(`Content-Type is ${response.contentType}`);
                this.results.warnings++;
            }

            if (response.body.includes('<!DOCTYPE html') || response.body.includes('<html')) {
                log.pass('HTML document structure valid');
                this.results.passed++;
            } else {
                log.fail('HTML structure not found');
                this.results.failed++;
            }

            return response;

        } catch (error) {
            log.fail(`Failed to access site: ${error.message}`);
            this.results.failed++;
            return null;
        }
    }

    async testPWAFeatures(htmlContent) {
        if (!htmlContent) return;
        
        log.section('Phase 2: PWA Features');

        // Check for Service Worker registration
        if (htmlContent.includes('navigator.serviceWorker')) {
            log.pass('Service Worker registration code found');
            this.results.passed++;
        } else {
            log.fail('Service Worker registration code not found');
            this.results.failed++;
        }

        // Check for manifest
        if (htmlContent.includes('manifest.webmanifest')) {
            log.pass('Manifest reference found in HTML');
            this.results.passed++;
        } else {
            log.fail('Manifest reference not found');
            this.results.failed++;
        }

        // Check for offline support
        if (htmlContent.includes('offline') || htmlContent.includes('online')) {
            log.pass('Offline detection code found');
            this.results.passed++;
        } else {
            log.warn('Offline detection code not found');
            this.results.warnings++;
        }

        // Check for theme support
        if (htmlContent.includes('theme') || htmlContent.includes('dark')) {
            log.pass('Dark mode/theme support found');
            this.results.passed++;
        } else {
            log.warn('Theme support not found');
            this.results.warnings++;
        }
    }

    async testManifest() {
        log.section('Phase 3: PWA Manifest');

        try {
            const response = await this.httpRequest('/manifest.webmanifest');
            
            if (response.status === 200) {
                log.pass('Manifest.webmanifest accessible (HTTP 200)');
                this.results.passed++;
            } else {
                log.fail(`Manifest not found (HTTP ${response.status})`);
                this.results.failed++;
                return;
            }

            try {
                const manifest = JSON.parse(response.body);
                
                const requiredFields = ['name', 'short_name', 'display', 'start_url', 'scope', 'theme_color', 'icons'];
                for (const field of requiredFields) {
                    if (manifest[field]) {
                        log.pass(`Manifest field '${field}' found`);
                        this.results.passed++;
                    } else {
                        log.fail(`Manifest field '${field}' missing`);
                        this.results.failed++;
                    }
                }

                if (manifest.display === 'standalone') {
                    log.pass('Display mode set to "standalone"');
                    this.results.passed++;
                } else {
                    log.warn(`Display mode is "${manifest.display}" (should be "standalone")`);
                    this.results.warnings++;
                }

                if (manifest.icons && manifest.icons.length > 0) {
                    log.pass(`${manifest.icons.length} icon(s) defined in manifest`);
                    this.results.passed++;
                } else {
                    log.fail('No icons defined in manifest');
                    this.results.failed++;
                }

            } catch (error) {
                log.fail(`Manifest JSON invalid: ${error.message}`);
                this.results.failed++;
            }

        } catch (error) {
            log.fail(`Failed to fetch manifest: ${error.message}`);
            this.results.failed++;
        }
    }

    async testServiceWorker() {
        log.section('Phase 4: Service Worker');

        try {
            const response = await this.httpRequest('/sw.js');
            
            if (response.status === 200) {
                log.pass('Service Worker file accessible (HTTP 200)');
                this.results.passed++;
            } else {
                log.fail(`Service Worker not found (HTTP ${response.status})`);
                this.results.failed++;
                return;
            }

            if (response.body.includes('self.addEventListener')) {
                log.pass('Service Worker contains event listeners');
                this.results.passed++;
            } else {
                log.fail('Service Worker structure invalid');
                this.results.failed++;
            }

            if (response.body.includes('cache') || response.body.includes('Cache')) {
                log.pass('Service Worker includes caching logic');
                this.results.passed++;
            } else {
                log.warn('Service Worker may not have caching');
                this.results.warnings++;
            }

            if (response.body.includes('fetch')) {
                log.pass('Service Worker includes fetch handler');
                this.results.passed++;
            } else {
                log.fail('Service Worker missing fetch handler');
                this.results.failed++;
            }

        } catch (error) {
            log.fail(`Failed to fetch Service Worker: ${error.message}`);
            this.results.failed++;
        }
    }

    async testIcons() {
        log.section('Phase 5: App Icons');

        const iconFiles = [
            { path: '/icons/icon-192.png', name: 'icon-192.png' },
            { path: '/icons/icon-512.png', name: 'icon-512.png' },
            { path: '/icons/apple-touch-icon.png', name: 'apple-touch-icon.png' }
        ];

        for (const icon of iconFiles) {
            try {
                const response = await this.httpRequest(icon.path);
                
                if (response.status === 200) {
                    log.pass(`${icon.name} accessible`);
                    this.results.passed++;
                } else {
                    log.fail(`${icon.name} not found (HTTP ${response.status})`);
                    this.results.failed++;
                }
            } catch (error) {
                log.fail(`Failed to access ${icon.name}: ${error.message}`);
                this.results.failed++;
            }
        }
    }

    async testSecurity() {
        log.section('Phase 6: Security & Headers');

        try {
            const response = await this.httpRequest('/');
            
            // Check for HTTPS
            if (this.baseUrl.includes('https://')) {
                log.pass('HTTPS enabled');
                this.results.passed++;
            } else {
                log.warn('Not using HTTPS');
                this.results.warnings++;
            }

            // Check common security headers
            const securityHeaders = {
                'x-content-type-options': 'X-Content-Type-Options',
                'x-frame-options': 'X-Frame-Options',
                'content-security-policy': 'Content-Security-Policy'
            };

            for (const [header, name] of Object.entries(securityHeaders)) {
                if (response.headers[header]) {
                    log.pass(`${name} header present`);
                    this.results.passed++;
                } else {
                    log.warn(`${name} header not found`);
                    this.results.warnings++;
                }
            }

        } catch (error) {
            log.fail(`Security check failed: ${error.message}`);
            this.results.failed++;
        }
    }

    printSummary() {
        log.section('Test Summary');
        
        console.log(`${colors.green}Passed: ${this.results.passed}${colors.reset}`);
        console.log(`${colors.red}Failed: ${this.results.failed}${colors.reset}`);
        console.log(`${colors.yellow}Warnings: ${this.results.warnings}${colors.reset}`);

        const total = this.results.passed + this.results.failed + this.results.warnings;
        const passRate = ((this.results.passed / total) * 100).toFixed(1);

        console.log(`\nPass Rate: ${passRate}%`);

        if (this.results.failed === 0) {
            log.pass('All critical tests passed! ✨');
            process.exit(0);
        } else if (this.results.failed < 3) {
            log.warn(`${this.results.failed} test(s) failed - review above`);
            process.exit(1);
        } else {
            log.fail('Multiple tests failed - check deployment');
            process.exit(1);
        }
    }

    async runAll() {
        console.log(`\n${colors.bold}${colors.blue}Kalorienrechner Deployment Test Suite${colors.reset}`);
        console.log(`Testing: ${this.baseUrl}\n`);

        const htmlContent = await this.testSiteAccess();
        
        if (htmlContent) {
            await this.testPWAFeatures(htmlContent.body);
            await this.testManifest();
            await this.testServiceWorker();
            await this.testIcons();
            await this.testSecurity();
        }

        this.printSummary();
    }
}

// Main execution
const testUrl = process.argv[2] || 'https://gtt4kmhbvp-code.github.io/kalorienrechner';

const tester = new DeploymentTester(testUrl);
tester.runAll().catch((error) => {
    log.fail(`Test suite failed: ${error.message}`);
    process.exit(1);
});
