# 📧 Email Verification Guide

Great! Your account was created. Now you need to verify your email address.

## ✅ Step 1: Check Your Email

1. **Go to your email inbox** (`asadmulla241097@gmail.com`)
2. **Look for an email from Firebase** (subject: "Verify your email")
3. **Check spam/junk folder** if you don't see it
4. **Click the verification link** in the email

## ✅ Step 2: After Clicking the Link

1. **You'll be redirected** to a page saying "Email verified"
2. **Go back to your app**: http://localhost:5173/login
3. **Try logging in again**

## ⚠️ If You Don't Receive the Email

If you don't see the verification email:

### Option 1: Resend Verification Email

1. **Go to**: http://localhost:5173/login
2. **Try to login** with your email and password
3. **You'll see an option to resend verification email**
4. **Click it** and check your inbox again

### Option 2: Check Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com/project/tech-giant-880c8/authentication/users
2. **Click "Authentication"** → **"Users"** tab
3. **Find your email**: `asadmulla241097@gmail.com`
4. **Check if email is verified** (there's a checkmark if verified)
5. **If not verified**, you can manually verify it:
   - Click on your user
   - Click "More" → "Send email verification"
   - Or manually set email as verified

### Option 3: Manually Verify in Firebase (Quick Fix)

For development, you can manually verify the email:

1. **Go to**: https://console.firebase.google.com/project/tech-giant-880c8/authentication/users
2. **Click on your user** (email: `asadmulla241097@gmail.com`)
3. **You'll see "Email verified" toggle**
4. **Turn it ON** (if it's off)
5. **Save**

## ✅ Step 3: Approve Your Account

After email is verified:

1. **Go to Firebase Console**: https://console.firebase.google.com/project/tech-giant-880c8/firestore
2. **Click "Firestore Database"**
3. **Click "users" collection**
4. **Find your account** (email: `asadmulla241097@gmail.com`)
5. **Click on it**
6. **Change "status"** from `"pending"` to `"approved"`
7. **Click "Update"**

## ✅ Step 4: Login

1. **Go to**: http://localhost:5173/login
2. **Login** with your email and password
3. **You should now be logged in!**

## ✅ Step 5: Access Admin Panel

1. **After logging in, go to**: http://localhost:5173/admin
2. **You'll see all users** and can approve/deny them

---

## 🎯 Quick Summary

1. **Check email** for verification link → Click it
2. **OR manually verify** in Firebase Console (Option 3 above)
3. **Approve account** in Firestore (change status to "approved")
4. **Login** at `/login`
5. **Access admin panel** at `/admin`

---

## 💡 Pro Tip

For faster development, you can:
- Manually verify email in Firebase Console (Option 3)
- Then approve the account in Firestore
- This skips waiting for the email

Let me know once you've verified your email and I'll help you with the next steps!
