# 🚀 Kalorienrechner Deployment Guide

Your Kalorienrechner is now ready to be deployed to GitHub Pages for online/offline usage!

## ✅ Pre-Deployment Checklist

- [x] **Core Application** - `index.html` with full PWA features
- [x] **Service Worker** - `sw.js` with offline caching
- [x] **PWA Manifest** - `manifest.webmanifest` for app metadata
- [x] **GitHub Actions** - `.github/workflows/pages.yml` for auto-deployment
- [x] **Documentation** - README and guides
- [ ] **PNG Icons** - Need to generate from SVG (see ICON_GUIDE.md)
- [ ] **Push to GitHub** - Repository ready for deployment

## 🔧 Step 1: Generate App Icons

Before deploying, generate PNG icons (5 minutes):

1. **Option A: Easiest** - Use [PWA Image Generator](https://www.pwabuilder.com/imageGenerator)
   - Upload `icons/icon-192.svg`
   - Download generated icons
   - Extract to `icons/` folder

2. **Option B: Command Line** - Use Python (if available)
   ```bash
   pip install cairosvg pillow
   python generate_icons.py
   ```

3. **Option C: Online Tools** - Use [CloudConvert](https://cloudconvert.com/svg-to-png)

**Needed files:**
- `icons/icon-192.png` (192×192)
- `icons/icon-512.png` (512×512)
- `icons/apple-touch-icon.png` (180×180)

See `ICON_GUIDE.md` for detailed instructions.

## 📤 Step 2: Push to GitHub

1. **Commit and push your code:**
   ```bash
   # Already committed - check current status
   git log --oneline -5
   git remote -v
   ```

2. **Add remote if not exists:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/kalorienrechner.git
   git branch -M main
   git push -u origin main
   ```

3. **Verify push:**
   - Check [GitHub.com](https://github.com/YOUR_USERNAME/kalorienrechner)
   - All files should be visible in the repository

## 🌐 Step 3: Enable GitHub Pages

### Automatic (Recommended)

The `.github/workflows/pages.yml` workflow handles deployment automatically:

1. Go to your repository on GitHub.com
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - Workflow `Deploy to GitHub Pages` should appear
4. Wait 1-2 minutes for deployment
5. Your site will be live at: `https://YOUR_USERNAME.github.io/kalorienrechner`

### Manual Setup (if automatic fails)

1. Go to **Settings** → **Pages**
2. Under "Source": Select `main` branch
3. Select `/ (root)` folder
4. Click **Save**
5. Wait ~1 minute for deployment

## ✅ Step 4: Verify Deployment

1. **Visit your site:**
   - `https://YOUR_USERNAME.github.io/kalorienrechner`
   - Should load immediately

2. **Test offline functionality:**
   - Open DevTools (F12)
   - Go to **Network** tab
   - Check **Offline** checkbox
   - Refresh page - app should still work!

3. **Test PWA installation:**
   - Desktop: Look for install icon in address bar
   - Mobile: Menu → "Add to Home Screen"

4. **Verify Service Worker:**
   - DevTools → **Application** → **Service Workers**
   - Should show "registered and running"

## 🔍 Step 5: Run Lighthouse Audit

Check your PWA score:

1. Open DevTools (F12)
2. Go to **Lighthouse** tab
3. Select "Mobile" and "PWA"
4. Click **Analyze page load**
5. Target scores:
   - ✓ Performance: 90+
   - ✓ Accessibility: 90+
   - ✓ Best Practices: 90+
   - ✓ SEO: 90+
   - ✓ PWA: 90+

### Common Lighthouse Warnings

| Issue | Fix |
|-------|-----|
| Missing PNG icons | Run icon generation (Step 1) |
| Manifest not valid JSON | Check `manifest.webmanifest` syntax |
| Service Worker not active | Refresh page and wait 5 seconds |
| No theme color | Already configured, refresh browser cache |
| Slow LCP (Largest Contentful Paint) | Good: already optimized |

## 🎨 Step 6: Customize for Your Needs

### Change App Colors

Edit `index.html` - CSS variables section:
```css
:root {
    --primary-color: #2c3e50;      /* Dark blue */
    --secondary-color: #3498db;    /* Light blue */
    --accent-color: #e74c3c;       /* Red */
    --bg-color: #ecf0f1;           /* Light gray */
    /* ... etc ... */
}
```

### Change App Name

Edit `manifest.webmanifest`:
```json
{
    "name": "Your App Name",
    "short_name": "Short Name",
    "description": "Your description"
}
```

### Add More Foods

Edit `index.html` - JavaScript section, expand `foodDatabase`:
```javascript
'Your Category': [
    { 
        name: 'Food Name', 
        kcal: 100,  // per 100g
        protein: 5,
        carbs: 10,
        fats: 3,
        density: 1.0
    }
]
```

## 🔄 Step 7: Update Process (Future Changes)

When you make changes:

1. **Edit files locally**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: Add new feature"
   git push
   ```
3. **Automatic deployment** - GitHub Actions runs in ~1 minute
4. **Cache refresh** - Users see updates after 24 hours or manual refresh
   - Desktop: `Ctrl+Shift+R` (or Cmd+Shift+R on Mac)
   - Mobile: Clear app cache in Settings

## 🐛 Troubleshooting Deployment

### App doesn't load after deployment

1. **Check deployment status:**
   - Repository → **Actions**
   - Verify `Deploy to GitHub Pages` passed

2. **Clear cache:**
   - `Ctrl+Shift+R` (not just Ctrl+R)
   - Wait 30 seconds

3. **Check GitHub Pages URL:**
   - Should be `https://USERNAME.github.io/REPO_NAME`
   - Not `https://github.io/USERNAME/REPO_NAME`

### Icons not showing

1. **Verify PNG icons exist:**
   - `icons/icon-192.png` - should be 192×192
   - `icons/icon-512.png` - should be 512×512
   - `icons/apple-touch-icon.png` - should be 180×180

2. **Check manifest references:**
   ```json
   "icons": [
       { "src": "/icons/icon-192.png", ... },
       { "src": "/icons/icon-512.png", ... },
       { "src": "/icons/apple-touch-icon.png", ... }
   ]
   ```

3. **Verify icon URLs work:**
   - Visit `https://USERNAME.github.io/kalorienrechner/icons/icon-192.png`
   - Image should display

### Service Worker issues

1. **Uninstall and reinstall app:**
   - Desktop: Uninstall from Apps
   - Mobile: Delete app from home screen

2. **Clear all caches:**
   - DevTools → **Application** → **Cache Storage**
   - Delete `kalorienrechner-v1`

3. **Check browser console for errors:**
   - DevTools → **Console**
   - Look for red error messages

## 📊 Monitoring & Analytics

Track usage with free services:

### Google Analytics (Optional)

Add to `index.html` `<head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
</script>
```

Replace `GA_ID` with your Google Analytics ID.

### GitHub Insights

Monitor usage via:
- Repository → **Insights** → **Traffic**
- See unique visitors and popular referrers

## 🎯 Next Features to Consider

- Multi-language support (German, English, Spanish)
- Daily intake tracking & history
- Meal planning
- Barcode scanner integration
- Macronutrient target calculator
- Export/import data

## 📚 Additional Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google: PWA Checklist](https://web.dev/pwa-checklist/)
- [GitHub Pages: Custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Manifest File Format](https://www.w3.org/TR/appmanifest/)

## 🎉 Congratulations!

Your Kalorienrechner PWA is ready for production! 

### What you now have:

✅ **Online usage** - Full-featured web app
✅ **Offline functionality** - Works without internet
✅ **Mobile installation** - Like a native app
✅ **Automatic updates** - GitHub Pages auto-deploys
✅ **Dark mode** - System preference awareness
✅ **Accessibility** - Keyboard & screen reader support
✅ **Performance** - Optimized for speed
✅ **Privacy** - All data stays on device

### Share your app:

- Share the link: `https://USERNAME.github.io/kalorienrechner`
- Let users install on mobile (menu → "Add to Home Screen")
- Use offline anytime!

Happy deploying! 🚀
