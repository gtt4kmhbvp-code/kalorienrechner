# 🧪 Kalorienrechner Deployment Testing Guide

Complete testing procedures to verify your PWA is working perfectly after merge.

## ⏱️ Timeline

1. **Merge PR** → 2. **Wait 1-2 min** → 3. **Run Tests** → 4. **All Clear!**

## 🚀 Phase 1: Site Loading Test

### Step 1: Access Your Live App

1. Open browser and go to:
   ```
   https://gtt4kmhbvp-code.github.io/kalorienrechner
   ```

2. **Expected Results:**
   - ✅ Page loads within 2 seconds
   - ✅ No 404 errors
   - ✅ UI displays properly
   - ✅ All text is readable

3. **Troubleshooting if blank:**
   - Wait 30 seconds and refresh
   - Check browser console (F12 → Console)
   - GitHub Actions may still be deploying (check Actions tab)

---

## 🎨 Phase 2: Visual & UI Testing

### Step 2: Check Visual Design

Open DevTools (F12) and verify:

1. **Light Mode (Default):**
   - ✅ Dark blue header (#2c3e50)
   - ✅ Light gray background (#ecf0f1)
   - ✅ Blue accent buttons (#3498db)
   - ✅ All text readable

2. **Dark Mode:**
   - Click theme toggle button (sun/moon icon)
   - ✅ Background turns dark
   - ✅ Text stays readable
   - ✅ Colors adjust automatically
   - Refresh page → Dark mode persists ✅

3. **Responsive Design:**
   - F12 → Toggle device toolbar (Ctrl+Shift+M)
   - Test at these widths:
     - ✅ Mobile: 320px (iPhone SE)
     - ✅ Tablet: 768px (iPad)
     - ✅ Desktop: 1024px+
   - Layout should adapt smoothly

---

## 🧮 Phase 3: Core Functionality Testing

### Step 3: Test Calculations

**Test 1 - Basic Calculation:**
1. Category: "Getränke" (Beverages)
2. Food: "Milch" (Milk)
3. Enter: 250 ml
4. Click: "Berechnen" (Calculate)

**Expected Results:**
```
✅ Kalorien: ~160
✅ Protein: ~8g
✅ Kohlenhydrate: ~12g
✅ Fette: ~9g
```

**Test 2 - Volume Conversion:**
1. Change 250 ml to 250 g (toggle unit button)
2. Results should update automatically
3. Should show similar macros (ml vs g conversion)

**Test 3 - Custom Food:**
1. Scroll down to "Meine Lebensmittel" (My Foods)
2. Click "Neues Lebensmittel hinzufügen"
3. Add:
   - Name: "Test Food"
   - Kcal: 100
   - Protein: 5
   - Carbs: 10
   - Fats: 3
4. Click "Speichern" (Save)
5. ✅ Food appears in list
6. Refresh page → ✅ Food still there (localStorage working!)

**Test 4 - Keyboard Shortcut:**
1. Fill in any calculation
2. Press **Ctrl+Enter**
3. ✅ Calculation runs without clicking button

---

## 📱 Phase 4: Offline Testing

### Step 4: Service Worker & Offline Mode

**Test Offline Functionality:**

1. **Load Page Online First:**
   - Make sure app loads completely
   - Wait 5 seconds (service worker installs)

2. **Go Offline:**
   - F12 → Network tab
   - Check "Offline" checkbox
   - Refresh page (Ctrl+R)

3. **Verify Offline Works:**
   - ✅ App still loads
   - ✅ Can calculate macros
   - ✅ Custom foods still accessible
   - ✅ Dark mode toggle works
   - ✅ Offline indicator shows (red bar at top)

4. **Go Back Online:**
   - Uncheck "Offline" checkbox
   - Offline indicator disappears ✅

**Test Service Worker Registration:**
1. F12 → Application tab
2. Left sidebar → Service Workers
3. ✅ Shows "kalorienrechner-v1"
4. ✅ Status: "activated and running"

**Test Cache Storage:**
1. F12 → Application tab
2. Left sidebar → Cache Storage
3. Click "kalorienrechner-v1"
4. ✅ Should contain:
   - index.html
   - manifest.webmanifest
   - Icons (if merged with new commit)

---

## 📲 Phase 5: Mobile Installation Testing

### Step 5: Install as App

#### On Android (Chrome):
1. Open app in Chrome browser
2. Look for install button (menu icon)
3. Click Menu (⋮) → "Install app"
4. Confirm installation
5. **App launches fullscreen:**
   - ✅ No address bar
   - ✅ App name in header
   - ✅ Icon on home screen
6. **Test offline:**
   - Close app
   - Airplane mode ON
   - Reopen app
   - ✅ Works perfectly offline!

#### On iOS (Safari):
1. Open app in Safari browser
2. Click Share button (rectangle with arrow)
3. Select "Add to Home Screen"
4. Customize name (optional)
5. Tap "Add"
6. **App launches fullscreen:**
   - ✅ No Safari toolbar
   - ✅ Status bar at top
   - ✅ Icon on home screen with custom name
7. **Test offline:**
   - Close app
   - Airplane mode ON
   - Tap app on home screen
   - ✅ Works offline!

#### On Desktop (Chrome/Edge):
1. Visit live app URL
2. Look for install button in address bar
3. Click install button
4. App opens in separate window
5. ✅ Taskbar shows app name
6. ✅ Window is fullscreen
7. ✅ No address bar

---

## 🎯 Phase 6: PWA Features Testing

### Step 6: Verify PWA Capabilities

**Test Manifest:**
1. F12 → Application tab
2. Left sidebar → Manifest
3. ✅ No errors
4. ✅ All fields populated:
   - name: "Kalorienrechner"
   - short_name: "Kalorien"
   - display: "standalone"
   - theme_color: "#2c3e50"
   - Icons array present

**Test Icons:**
1. Home screen (after installation)
2. ✅ Professional icon showing
3. ✅ Apple/food symbol visible
4. ✅ Proper colors

**Test App Shortcuts:**
1. Right-click app icon (Windows)
2. Or long-press app icon (Android)
3. ✅ Should show "Berechnen" shortcut

---

## 🏃 Phase 7: Performance Testing

### Step 7: Run Lighthouse Audit

1. F12 → Lighthouse tab
2. Select:
   - Device: **Mobile**
   - Categories: **PWA** + **Performance**
3. Click "Analyze page load"
4. Wait for audit to complete

**Target Scores:**
| Category | Target | Status |
|----------|--------|--------|
| PWA | 90+ | ✅ |
| Performance | 85+ | ✅ |
| Accessibility | 90+ | ✅ |
| Best Practices | 85+ | ✅ |
| SEO | 80+ | ✅ |

**Common Lighthouse Notes:**
- 🟡 "Install icon insufficient size" → Normal if using 1x1 placeholder
- 🟡 "Installable" might show warning → OK, our icons work
- ✅ "Has service worker" → Should pass
- ✅ "HTTPS" → Should pass (GitHub Pages)
- ✅ "Manifest valid" → Should pass

---

## ♿ Phase 8: Accessibility Testing

### Step 8: Keyboard Navigation

1. **Tab through all elements:**
   - F12 or just start pressing Tab
   - Navigate through:
     - ✅ Category dropdown
     - ✅ Food dropdown
     - ✅ Amount input
     - ✅ Unit toggle button
     - ✅ Calculate button
     - ✅ Theme toggle button

2. **Verify Focus Indicators:**
   - Each element should show visible focus ring
   - Ring should be blue or colored

3. **Test Enter/Space:**
   - Tab to button
   - Press Enter or Space
   - ✅ Button activates

4. **Test Screen Reader (Windows Narrator):**
   - Press Windows + Enter (toggle Narrator)
   - Use arrow keys to navigate
   - ✅ All labels announced
   - ✅ Button purposes clear
   - ✅ Form fields labeled
   - Windows + Enter again to disable

---

## 🔍 Phase 9: Cross-Browser Testing

### Step 9: Test Multiple Browsers

Visit live app in:

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | Test | Test | ✅ Works |
| Firefox | Test | Test | ✅ Works |
| Safari | Test | Test | ✅ Works |
| Edge | Test | Test | ✅ Works |

**Expected Results:** Identical look and functionality across all browsers

---

## 🌐 Phase 10: Network Conditions

### Step 10: Test Slow Networks

1. F12 → Network tab
2. Throttling dropdown (currently "No throttling")
3. Select "Slow 3G"
4. Refresh page
5. **Expected:**
   - ✅ Takes 5-10 seconds but loads
   - ✅ Content loads progressively
   - ✅ Still fully functional
   - ✅ No layout shifts

---

## 📋 Master Test Checklist

### Critical Path (MUST PASS)
- [ ] Site loads at GitHub Pages URL
- [ ] Calculations work correctly
- [ ] Offline mode works (toggle offline)
- [ ] Service worker registered
- [ ] Icons show properly
- [ ] Dark mode toggles

### Standard Path (SHOULD PASS)
- [ ] Custom foods can be added
- [ ] Custom foods persist (after refresh)
- [ ] Keyboard shortcuts work
- [ ] Responsive at all widths (320, 768, 1024px)
- [ ] Mobile installation works
- [ ] PWA manifest valid
- [ ] Lighthouse score 90+

### Enhanced Path (NICE TO HAVE)
- [ ] Keyboard navigation complete
- [ ] Screen reader reads all labels
- [ ] Works on multiple browsers
- [ ] Works on slow networks
- [ ] Icons match branding
- [ ] Share with team/users

---

## 🐛 Troubleshooting Test Failures

### "Site doesn't load"
```
1. Wait 2 minutes (GitHub Actions may still deploying)
2. Check: https://github.com/gtt4kmhbvp-code/kalorienrechner/actions
3. If Actions fail, check error messages
4. Hard refresh: Ctrl+Shift+R (not just Ctrl+R)
```

### "Offline doesn't work"
```
1. Verify Service Worker installed:
   F12 → Application → Service Workers
2. Wait 5+ seconds after page loads online
3. Refresh while offline
4. Check console for errors (F12 → Console)
```

### "Icons don't show"
```
1. Check manifest references:
   F12 → Application → Manifest
2. Icons should list all 3 PNG files
3. Visit each icon URL directly:
   https://gtt4kmhbvp-code.github.io/kalorienrechner/icons/icon-192.png
4. Should download image (not 404 error)
```

### "App won't install"
```
1. Must use HTTPS (GitHub Pages has this ✅)
2. Must visit app at least once online
3. Must wait ~10 seconds after first load
4. Try incognito/private mode (fresh installation)
5. Try different browser
```

### "Dark mode doesn't persist"
```
1. Check localStorage is enabled (not in private mode)
2. F12 → Application → localStorage
3. Should have entries for theme preference
4. Clear localStorage and try again
```

---

## 📊 Test Report Template

Save this and share results:

```
═══════════════════════════════════════════════════════════
KALORIENRECHNER DEPLOYMENT TEST REPORT
═══════════════════════════════════════════════════════════

Date: [DATE]
Tester: [YOUR NAME]
URL Tested: https://gtt4kmhbvp-code.github.io/kalorienrechner

RESULTS:
═══════════════════════════════════════════════════════════

Critical Path:
  [ ] Site loads at GitHub Pages
  [ ] Calculations work
  [ ] Offline works
  [ ] Service worker registered
  [ ] Icons display
  [ ] Dark mode works

Standard Path:
  [ ] Custom foods save
  [ ] Custom foods persist
  [ ] Keyboard shortcuts
  [ ] Responsive design
  [ ] Mobile installation
  [ ] PWA manifest valid
  [ ] Lighthouse score 90+

Enhanced Path:
  [ ] Keyboard navigation
  [ ] Screen reader support
  [ ] Multi-browser compatible
  [ ] Slow network works
  [ ] Professional branding
  [ ] Ready to share

═══════════════════════════════════════════════════════════

Issues Found:
  [List any issues here]

Overall Status: [ ] PASS / [ ] FAIL / [ ] NEEDS REVIEW

Comments:
  [Additional notes]

═══════════════════════════════════════════════════════════
```

---

## ✅ Success Criteria

Your deployment is **SUCCESSFUL** when:

✅ All "Critical Path" tests pass
✅ Most "Standard Path" tests pass
✅ Site is fast (Lighthouse 80+)
✅ App works offline
✅ Mobile installation works
✅ Icons display
✅ No console errors

---

## 🎉 Ready to Test!

1. Make sure you've **merged the PR**
2. Wait **1-2 minutes** for GitHub Actions
3. Run through Phase 1 (Site Loading) first
4. Continue with remaining phases
5. Share results!

**Need help?** Check Troubleshooting section above.

Happy testing! 🚀
