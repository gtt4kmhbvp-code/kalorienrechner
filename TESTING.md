# 🧪 Kalorienrechner Testing Guide

Complete testing guide for ensuring your PWA works perfectly before deployment.

## 📋 Pre-Deployment Testing Checklist

### Phase 1: Local Testing (Before Deployment)

#### 1.1 HTML/CSS/JavaScript Validation

- [ ] Open `index.html` directly in browser (file:// protocol)
  - App loads without errors
  - UI displays correctly
  - Dark mode toggle works
  - No console errors (DevTools → Console)

- [ ] Validate JavaScript
  - Open DevTools → **Console**
  - No red errors or warnings
  - App functions: calculate, add food, toggle theme

- [ ] CSS Rendering
  - All fonts load correctly
  - Colors match design
  - Responsive: test at 320px, 768px, 1024px widths
  - Dark mode displays properly

#### 1.2 Core Functionality Testing

**Basic Calculations:**
- [ ] Select "Getränke" → "Milch" → enter 250ml
- [ ] Click "Berechnen" (Calculate)
- [ ] Results show: ~160 kcal, 8g protein, 12g carbs, 9g fat
- [ ] Volume-to-weight conversion works (ml → g)

**Custom Foods:**
- [ ] Add custom food: "Mein Müsli" with 400 kcal, 8g protein, 60g carbs, 10g fat
- [ ] Food appears in list
- [ ] Can calculate with custom food
- [ ] Refresh page - custom food persists

**Theme Toggle:**
- [ ] Dark mode toggle shows in header
- [ ] Toggling changes colors
- [ ] Refresh page - theme preference persists

**Offline Indicator:**
- [ ] DevTools → Network → set to "Offline"
- [ ] Offline indicator appears (red bar)
- [ ] App still functional
- [ ] Toggle back online - indicator disappears

#### 1.3 Service Worker Testing

**Registration:**
- [ ] DevTools → **Application** → **Service Workers**
- [ ] Shows "kalorienrechner-v1" as registered and running
- [ ] Status shows "activated and running"

**Caching:**
- [ ] DevTools → **Application** → **Cache Storage**
- [ ] Shows "kalorienrechner-v1" cache
- [ ] Contains files:
  - index.html
  - manifest.webmanifest
  - icon files (once added)

**Offline Functionality:**
- [ ] Load app fully online
- [ ] Go to Network tab → select "Offline"
- [ ] Reload page (Ctrl+R)
- [ ] App loads from cache
- [ ] All features work offline
- [ ] Custom foods still accessible

#### 1.4 PWA Manifest Testing

**Manifest Validity:**
- [ ] Open DevTools → **Application** → **Manifest**
- [ ] No errors shown
- [ ] All fields present:
  - name
  - short_name
  - description
  - start_url
  - icons
  - display: "standalone"

**Manifest Content:**
- [ ] `name`: "Kalorienrechner"
- [ ] `short_name`: "Kalorien"
- [ ] `theme_color`: "#2c3e50"
- [ ] `display`: "standalone"
- [ ] Icons array populated

### Phase 2: Advanced Features Testing

#### 2.1 Accessibility Testing

**Keyboard Navigation:**
- [ ] Tab through all elements
- [ ] Focus indicator visible on all interactive elements
- [ ] Enter/Space triggers buttons
- [ ] Tab order makes sense (top to bottom)

**Screen Reader (Windows Narrator):**
- [ ] Press Windows + Enter to activate
- [ ] Navigate with arrow keys
- [ ] All form labels announced
- [ ] Button purposes clear
- [ ] Results section accessible

**Color Contrast:**
- [ ] DevTools → **Lighthouse** → run audit
- [ ] No contrast warnings
- [ ] Text readable on both light and dark backgrounds

#### 2.2 Performance Testing

**Load Time:**
- [ ] Open DevTools → **Network**
- [ ] Reload page
- [ ] Total load time < 2 seconds
- [ ] index.html loads in ~200ms
- [ ] No large render-blocking resources

**Lighthouse Audit:**
1. DevTools → **Lighthouse**
2. Select "Mobile" profile
3. Click "Analyze page load"
4. Target scores:
   - [ ] Performance ≥ 90
   - [ ] Accessibility ≥ 95
   - [ ] Best Practices ≥ 90
   - [ ] SEO ≥ 90
   - [ ] PWA ≥ 90

**Bundle Size:**
- [ ] index.html < 100KB
- [ ] No external dependencies
- [ ] All resources inlined

#### 2.3 Mobile Testing

**Android (Chrome):**
- [ ] Install app: Menu → "Add to Home Screen"
- [ ] App installs and opens fullscreen
- [ ] Icon visible on home screen
- [ ] Offline functionality works
- [ ] All calculations work

**iOS (Safari):**
- [ ] Share → "Add to Home Screen"
- [ ] App installs and opens fullscreen
- [ ] Responsive layout works
- [ ] Works offline
- [ ] Colors render correctly

**Tablet Testing:**
- [ ] iPad/Android Tablet in landscape
- [ ] Layout adapts properly
- [ ] Touch interactions work
- [ ] Input fields properly sized

### Phase 3: Post-Deployment Testing

#### 3.1 Live Site Testing

After pushing to GitHub Pages:

**Site Accessibility:**
- [ ] Visit `https://USERNAME.github.io/kalorienrechner`
- [ ] Page loads within 3 seconds
- [ ] No 404 errors in DevTools
- [ ] All resources load (CSS, JS, images)

**Installation Testing:**
- [ ] Desktop: Install button appears in address bar
- [ ] Mobile: Add to home screen option available
- [ ] Icon shows in list
- [ ] App launches fullscreen

**Offline Functionality:**
- [ ] Install app first
- [ ] DevTools → Network → Offline
- [ ] Open installed app
- [ ] All features work without internet
- [ ] Custom foods accessible

**Updates:**
- [ ] Make small change to index.html
- [ ] Commit and push
- [ ] Wait for GitHub Actions to complete
- [ ] Visit live site - changes visible
- [ ] Installed app gets update notification

#### 3.2 Cross-Browser Testing

Test on multiple browsers:

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | [ ] | [ ] | Fully compatible |
| Firefox | [ ] | [ ] | Fully compatible |
| Safari | [ ] | [ ] | Fully compatible |
| Edge | [ ] | [ ] | Fully compatible |
| Samsung Internet | - | [ ] | Android |
| Chrome Mobile | - | [ ] | Android |
| Safari iOS | - | [ ] | iOS |

#### 3.3 Network Conditions Testing

Test on various network speeds using DevTools:

1. Open DevTools → **Network** tab
2. Find "Throttling" dropdown (currently "No throttling")
3. Select each preset and reload:

- [ ] **Fast 3G**
  - Load time: < 5 seconds
  - App fully functional
  - No layout shifts

- [ ] **Slow 3G**
  - Load time: < 10 seconds
  - Content loads progressively
  - Still usable

- [ ] **Offline** (via Service Worker)
  - Page loads from cache
  - All features work
  - Offline indicator visible

## 🐛 Bug Checklist

Common issues to verify are fixed:

- [ ] **localStorage quota exceeded** - Handled with try-catch
- [ ] **Service Worker fails silently** - Console logs errors
- [ ] **Dark mode flicker on load** - Preference restored instantly
- [ ] **Food calculations incorrect** - Volume conversion verified
- [ ] **Custom foods lost after update** - localStorage preserved
- [ ] **App crashes when offline** - Network errors handled
- [ ] **Icons don't load** - SVG fallback in manifest
- [ ] **Manifest not valid** - JSON validated

## 📊 Performance Targets

Final targets before going live:

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Page Load (3G) | < 5s | ? | [ ] |
| TTI (Time to Interactive) | < 3.5s | ? | [ ] |
| FCP (First Contentful Paint) | < 1.8s | ? | [ ] |
| LCP (Largest Contentful Paint) | < 2.5s | ? | [ ] |
| CLS (Cumulative Layout Shift) | < 0.1 | ? | [ ] |
| Bundle Size | < 50KB | ? | [ ] |
| Lighthouse Score | 95+ | ? | [ ] |

## 🔐 Security Checklist

- [ ] No hardcoded API keys or secrets
- [ ] No tracking/analytics (unless intentional)
- [ ] localStorage used for user preferences only
- [ ] No external font CDN (using system fonts)
- [ ] HTTPS enabled on GitHub Pages (automatic)
- [ ] CSP headers not needed (no external resources)
- [ ] No eval() or other unsafe practices

## 📱 Installation Verification

Verify PWA installs correctly:

**Desktop:**
1. [ ] Visit app URL
2. [ ] Install button appears in address bar
3. [ ] Click install
4. [ ] App opens in window
5. [ ] Taskbar shows app name
6. [ ] Icon visible

**Android:**
1. [ ] Open in Chrome
2. [ ] Menu → Add to Home Screen
3. [ ] Icon appears on home screen
4. [ ] App opens fullscreen
5. [ ] Status bar hidden
6. [ ] Offline works

**iOS:**
1. [ ] Open in Safari
2. [ ] Share → Add to Home Screen
3. [ ] Name app
4. [ ] Icon visible on home screen
5. [ ] App opens fullscreen
6. [ ] Gesture to go back works

## 🎯 Acceptance Criteria

App is ready for production when:

✅ All Phase 1 tests pass
✅ All Phase 2 tests pass
✅ All Phase 3 tests pass
✅ Lighthouse score ≥ 90 for all categories
✅ Offline functionality fully working
✅ Mobile installation works (Android & iOS)
✅ No console errors or warnings
✅ Performance targets met
✅ Security checklist complete
✅ All bugs fixed

## 📋 Test Report Template

Keep a record of testing:

```
Date: [DATE]
Tester: [NAME]
Browser: [BROWSER + VERSION]
Device: [DEVICE/OS]

Results:
- Functionality: PASS / FAIL / PARTIAL
- Performance: PASS / FAIL
- Offline: PASS / FAIL
- Installation: PASS / FAIL
- Accessibility: PASS / FAIL

Issues Found:
1. [Issue 1]
2. [Issue 2]

Status: READY / NOT READY
```

## 🔗 Testing Tools

Useful resources:

- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Automated audits
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility
- [WAVE Browser Extension](https://wave.webaim.org/extension/) - Accessibility audit
- [PWA Builder](https://www.pwabuilder.com/) - PWA validation
- [Google Mobile Friendly Test](https://search.google.com/test/mobile-friendly) - Mobile UX

## ❓ Troubleshooting During Testing

### App doesn't work offline
- Ensure Service Worker is registered and activated
- Wait 5+ seconds after loading page online
- Check Cache Storage has content
- Clear cache and reload

### Lighthouse shows low score
- Check for console errors
- Verify manifest is valid
- Ensure icons are accessible
- Run performance audit specifically

### Custom foods disappear
- Check browser's localStorage is enabled
- Not in private/incognito mode
- Not hitting storage quota (clear old data)
- Check DevTools → Application → localStorage

### Icons don't show
- Verify PNG files exist in icons/ folder
- Check manifest paths are correct
- Ensure URLs resolve (visit in address bar)
- Wait 24 hours for cache invalidation

## ✅ Next Steps

Once all tests pass:

1. Create release commit
2. Push to GitHub
3. Wait for GitHub Actions deployment (1-2 min)
4. Verify live site
5. Share with users!

Happy testing! 🎉
