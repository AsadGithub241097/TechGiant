# 🔧 Quick .env Setup Guide

## ✅ Step 1: Get Your Firebase Credentials

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project** (or create a new one)
3. **Click the gear icon** ⚙️ next to "Project Overview"
4. **Select "Project settings"**
5. **Scroll down to "Your apps"** section
6. **Click on your web app** (or click `</>` to add a new web app)
7. **Copy the config values** from the `firebaseConfig` object

## ✅ Step 2: Update .env File

Open the `.env` file in the root directory and replace the placeholder values:

```env
VITE_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## ✅ Step 3: Restart Development Server

After updating the `.env` file:

1. **Stop the current server** (Ctrl+C)
2. **Restart it**: `npm run dev`

The app will automatically pick up the new environment variables!

## 🔍 How to Find Each Value

| Variable | Where to Find |
|----------|---------------|
| `VITE_FIREBASE_API_KEY` | In `firebaseConfig.apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | In `firebaseConfig.authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | In `firebaseConfig.projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | In `firebaseConfig.storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | In `firebaseConfig.messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | In `firebaseConfig.appId` |
| `VITE_FIREBASE_MEASUREMENT_ID` | In `firebaseConfig.measurementId` (optional) |

## ⚠️ Important Notes

1. **Never commit `.env` to git** - It should already be in `.gitignore`
2. **Use `.env.local` for local overrides** (optional)
3. **Restart the dev server** after changing `.env` values
4. **Vite requires `VITE_` prefix** for environment variables

## 🚀 Quick Test

After setting up, you should see in the browser console:
```
✅ Firebase initialized successfully
```

If you see:
```
⚠️ Firebase not configured
```
Then check that your `.env` file has the correct values (no quotes, no spaces).

## 📝 Example .env File

```env
VITE_FIREBASE_API_KEY=AIzaSyB1234567890abcdefghijklmnop
VITE_FIREBASE_AUTH_DOMAIN=techgiant-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=techgiant-12345
VITE_FIREBASE_STORAGE_BUCKET=techgiant-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123XYZ
```

## 🆘 Still Having Issues?

1. Check that all values are filled (no "your-xxx-here" placeholders)
2. Make sure there are no quotes around the values
3. Restart the dev server after changes
4. Check browser console for specific error messages
