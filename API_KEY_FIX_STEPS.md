# 🔑 Fix API Key Error - Simple Steps

The API key is being sent correctly, but Google is rejecting it. Here's the exact fix:

## 🎯 The Problem

Your API key `AIzaSyB2pVuxtSSeLhUmjwq3XJKa7BH80wOsjow` exists, but Google Cloud is blocking it because of restrictions.

## ✅ Solution: Remove API Key Restrictions

### Step 1: Open This Link
Click here: https://console.cloud.google.com/apis/credentials?project=tech-giant-880c8

### Step 2: Find Your API Key
- You'll see a list of API keys
- Look for one that starts with: `AIzaSyB2pVuxtSSeLhUmjwq3XJKa7BH80wOsjow`
- **Click on it** (the name, not the copy icon)

### Step 3: Remove Restrictions
When the settings page opens:

1. **Scroll down to "API restrictions"**
   - You'll see either:
     - "Don't restrict key" (good - leave it)
     - "Restrict key" (bad - change it)
   
2. **If it says "Restrict key"**:
   - Click the radio button for **"Don't restrict key"**
   
3. **Scroll down to "Application restrictions"**
   - Click the radio button for **"None"**

4. **Click the blue "SAVE" button** at the bottom
   - Wait for the green "Saved" message

5. **Wait 2 minutes** for changes to take effect

### Step 4: Test Again
1. **Restart your server**:
   - Terminal: Press `Ctrl+C`
   - Type: `npm run dev`
   
2. **Refresh browser**: `Ctrl+Shift+R`

3. **Try signing up again**

---

## 🔄 Alternative: If You Can't Find the API Key

If you don't see the API key in the list, we need to create a new one:

### Create New API Key:
1. **Go to**: https://console.cloud.google.com/apis/credentials?project=tech-giant-880c8
2. **Click "+ CREATE CREDENTIALS"** at the top
3. **Select "API key"**
4. **Copy the new API key**
5. **Click "RESTRICT KEY"** (to configure it)
6. **Set "API restrictions"** to **"Don't restrict key"**
7. **Set "Application restrictions"** to **"None"**
8. **Click "SAVE"**
9. **Update your `.env` file** with the new key
10. **Restart server**

---

## 📝 Quick Checklist

- [ ] Opened Google Cloud Console credentials page
- [ ] Found the API key
- [ ] Set "API restrictions" to "Don't restrict key"
- [ ] Set "Application restrictions" to "None"
- [ ] Clicked "SAVE"
- [ ] Waited 2 minutes
- [ ] Restarted dev server
- [ ] Refreshed browser
- [ ] Tried signing up again

---

## 🆘 Still Not Working?

If it still doesn't work after removing restrictions, tell me and I'll:
1. Help you create a new API key
2. Check if there are other issues
3. Try a different approach

The most common issue is API key restrictions - once you remove them, it should work immediately!
