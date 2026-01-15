# 🔧 Fix API Key Restrictions

The Identity Toolkit API is enabled ✅, but your API key might have restrictions. Let's fix that!

## ✅ Step 1: Go to API Key Settings

1. **Click this link**:
   https://console.cloud.google.com/apis/credentials?project=tech-giant-880c8

2. **You'll see a list of API keys**
   - Look for one that starts with: `AIzaSyB2pVuxtSSeLhUmjwq3XJKa7BH80wOsjow`
   - **Click on it** to edit

## ✅ Step 2: Configure API Restrictions

When you click on the API key, you'll see settings. Here's what to do:

### Option A: Remove Restrictions (Easiest - for development)

1. **Find "API restrictions"** section
2. **Select "Don't restrict key"** (or "None")
3. **Click "SAVE"** at the bottom
4. **Wait 1-2 minutes**

### Option B: Allow Specific APIs (More secure)

1. **Find "API restrictions"** section
2. **Select "Restrict key"**
3. **Click "Select APIs"**
4. **Check these boxes**:
   - ✅ Identity Toolkit API
   - ✅ Firebase Installations API
   - ✅ Firebase Remote Config API
5. **Click "SAVE"**
6. **Wait 1-2 minutes**

## ✅ Step 3: Configure Application Restrictions

1. **Find "Application restrictions"** section
2. **For development, select "None"** (or "HTTP referrers" and add `localhost:5173`)
3. **Click "SAVE"**
4. **Wait 1-2 minutes**

## ✅ Step 4: Restart and Test

1. **Restart your dev server**:
   - Press `Ctrl+C` in terminal
   - Type: `npm run dev`

2. **Refresh browser**: `Ctrl+Shift+R`

3. **Try signing up again**

---

## 🎯 Quick Summary

1. Go to: https://console.cloud.google.com/apis/credentials?project=tech-giant-880c8
2. Click on your API key
3. Set "API restrictions" to "Don't restrict key" (or allow the 3 APIs listed above)
4. Set "Application restrictions" to "None"
5. Click "SAVE"
6. Wait 1-2 minutes
7. Restart server and try again

That should fix it! 🚀
