# 🔍 How to Get Firebase Web App Configuration

Based on your screenshots, I can see your project:
- **Project ID**: `tech-giant-880c8`
- **Project Number**: `422558012658`

But we need the **Firebase Web App Configuration** (not service accounts). Here's how to find it:

## 📍 Step-by-Step Instructions

### Step 1: Go to Firebase Console
1. Go to: https://console.firebase.google.com/
2. Make sure you're signed in with `asadmulla241097@gmail.com`
3. Select your project: **Tech Giant** (or `tech-giant-880c8`)

### Step 2: Navigate to Project Settings
1. Click the **gear icon** ⚙️ next to "Project Overview" (top left)
2. Click **"Project settings"**

### Step 3: Find Your Web App
1. Scroll down to the **"Your apps"** section
2. Look for a web app (icon: `</>`)
3. If you don't see one, click **"Add app"** → Select **Web** (`</>`)
4. Give it a nickname: "TechGiant Web"
5. Click **"Register app"**

### Step 4: Copy the Configuration
You'll see a code block that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "tech-giant-880c8.firebaseapp.com",
  projectId: "tech-giant-880c8",
  storageBucket: "tech-giant-880c8.appspot.com",
  messagingSenderId: "422558012658",
  appId: "1:422558012658:web:abc123def456",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 5: Update Your .env File
Copy each value to your `.env` file:

```env
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=tech-giant-880c8.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tech-giant-880c8
VITE_FIREBASE_STORAGE_BUCKET=tech-giant-880c8.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=422558012658
VITE_FIREBASE_APP_ID=1:422558012658:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🎯 Quick Visual Guide

The page you're looking for should show:
- A code snippet with `firebaseConfig`
- Options to "Copy" the config
- SDK setup instructions

**NOT** the service accounts page (which is what you're currently viewing).

## ⚠️ Important Notes

1. **Service accounts** (what you're viewing) are for **server-side** use
2. **Web app config** (what we need) is for **client-side** use
3. They're in different sections of the console

## 🚀 After Getting the Config

1. Update your `.env` file with the values
2. Restart your dev server: `npm run dev`
3. Check browser console for: `✅ Firebase initialized successfully`

## 📸 What to Look For

The page should have:
- A heading like "Add Firebase to your web app"
- A code block with `const firebaseConfig = { ... }`
- A "Copy" button next to the code
- SDK setup instructions below

If you can't find it, let me know and I'll help you navigate there!
