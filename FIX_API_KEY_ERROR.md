# 🔧 Fix "API key not valid" Error

## 🚨 The Problem

You're seeing: `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)`

This happens when:
1. Dev server wasn't restarted after updating `.env`
2. API key restrictions in Google Cloud Console
3. Identity Toolkit API not enabled

## ✅ Solution 1: Restart Dev Server (MOST COMMON FIX)

**Vite only loads environment variables when the server starts!**

1. **Stop the current server**:
   - Go to terminal where `npm run dev` is running
   - Press `Ctrl+C` to stop it

2. **Start it again**:
   ```bash
   npm run dev
   ```

3. **Hard refresh browser**:
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or clear cache and reload

4. **Check browser console**:
   - Should see: `✅ Firebase initialized successfully`
   - If you still see the error, try Solution 2

## ✅ Solution 2: Enable Identity Toolkit API

The API key needs the Identity Toolkit API enabled:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**: Tech Giant (`tech-giant-880c8`)
3. **Go to "APIs & Services"** → **"Enabled APIs"**
4. **Click "+ ENABLE APIS AND SERVICES"**
5. **Search for**: "Identity Toolkit API"
6. **Click on it** → **Click "ENABLE"**
7. **Wait 1-2 minutes** for it to activate
8. **Try again** in your app

## ✅ Solution 3: Check API Key Restrictions

If your API key has restrictions, you need to configure them:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**: Tech Giant
3. **Go to "APIs & Services"** → **"Credentials"**
4. **Find your API key** (starts with `AIzaSyB...`)
5. **Click on it** to edit
6. **Check "API restrictions"**:
   - If "Restrict key" is selected, make sure these APIs are enabled:
     - ✅ Identity Toolkit API
     - ✅ Firebase Installations API
     - ✅ Firebase Remote Config API
7. **Check "Application restrictions"**:
   - For development: Set to "None" (or add `localhost` to HTTP referrers)
   - For production: Add your domain
8. **Click "SAVE"**
9. **Wait 1-2 minutes**, then try again

## ✅ Solution 4: Verify .env File

Make sure your `.env` file is correct:

1. **Check file location**: Should be in project root (same folder as `package.json`)
2. **Check format** (no quotes, no spaces):
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyB2pVuxtSSeLhUmjwq3XJKa7BH80wOsjow
   ```
   ❌ Wrong: `VITE_FIREBASE_API_KEY="AIzaSyB..."`
   ❌ Wrong: `VITE_FIREBASE_API_KEY = AIzaSyB...`
   ✅ Correct: `VITE_FIREBASE_API_KEY=AIzaSyB...`

3. **Verify all values are filled**:
   ```bash
   cat .env | grep VITE_FIREBASE
   ```

## ✅ Solution 5: Check Browser Console

Open browser DevTools (F12) and check:

1. **Console tab**: Look for error messages
2. **Network tab**: Check the failed request
   - Look at the request URL
   - Check if API key is being sent correctly
3. **Application tab** → **Local Storage**:
   - Clear any cached Firebase data

## 🔍 Debug: Check What API Key is Being Used

Add this temporarily to see what's being loaded:

1. **Open**: `src/config/firebase.ts`
2. **Add after line 15**:
   ```typescript
   console.log('🔍 Firebase Config Check:', {
     apiKey: firebaseConfig.apiKey,
     hasApiKey: !!firebaseConfig.apiKey,
     isDemo: firebaseConfig.apiKey === 'demo-api-key',
     envValue: import.meta.env.VITE_FIREBASE_API_KEY
   });
   ```
3. **Check browser console** to see what value is being used

## 📋 Quick Checklist

- [ ] Stopped and restarted dev server
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Enabled Identity Toolkit API in Google Cloud
- [ ] Checked API key restrictions
- [ ] Verified .env file format (no quotes, no spaces)
- [ ] Checked browser console for specific errors

## 🚀 Most Likely Fix

**99% of the time, it's Solution 1**: Just restart the dev server!

```bash
# Stop server (Ctrl+C)
npm run dev
```

Then hard refresh browser: `Ctrl+Shift+R` or `Cmd+Shift+R`

## 🆘 Still Not Working?

1. **Check if API key matches Firebase Console**:
   - Go to Firebase Console → Project Settings → Your apps
   - Compare the `apiKey` value with your `.env` file

2. **Try creating a new API key**:
   - Google Cloud Console → APIs & Services → Credentials
   - Create new API key
   - Update `.env` with new key
   - Restart server

3. **Check Firebase project status**:
   - Make sure project is active
   - Check billing status (some features require billing)

## 📞 Need More Help?

Share:
- Browser console errors
- Network tab request details
- What you see when you check the debug console.log
