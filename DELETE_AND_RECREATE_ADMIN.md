# ✅ Delete and Recreate Admin Account - Step by Step

Yes, `asadmulla241097@gmail.com` is the **original admin email**, so it will definitely be recognized as admin!

## 🗑️ Step 1: Delete All Users from Firebase Authentication

1. **Go to Firebase Authentication**:
   https://console.firebase.google.com/project/tech-giant-880c8/authentication/users

2. **Select all users**:
   - Check the box at the top (selects all users)
   - OR click on each user individually

3. **Delete users**:
   - Click the **"Delete"** button (usually at the top)
   - Confirm the deletion

## 🗑️ Step 2: Delete All Users from Firestore

1. **Go to Firestore Database**:
   https://console.firebase.google.com/project/tech-giant-880c8/firestore

2. **Delete the "users" collection**:
   - Click on "users" collection
   - Select all documents
   - Click "Delete" (or delete the entire collection)

## ✅ Step 3: Sign Up Again with Admin Email

1. **Go to your app**: http://localhost:5173/login
2. **Click "Create an account"**
3. **Fill in the form**:
   - **Name**: Your name
   - **Email**: `asadmulla241097@gmail.com` ✅ (This is the admin email)
   - **Password**: Choose a secure password
   - **Confirm Password**: Same password
4. **Click "Create account"**

## ✅ Step 4: Approve Your Admin Account

1. **Go to Firestore**: https://console.firebase.google.com/project/tech-giant-880c8/firestore
2. **Click "users" collection**
3. **Find your account** (email: `asadmulla241097@gmail.com`)
4. **Click on it**
5. **Change "status"** from `"pending"` to `"approved"`
6. **Click "Update"**

## ✅ Step 5: Login as Admin

1. **Go to**: http://localhost:5173/login
2. **Login** with:
   - Email: `asadmulla241097@gmail.com`
   - Password: (the one you just created)
3. **You should be logged in!**

## ✅ Step 6: Access Admin Panel

1. **After logging in, go to**: http://localhost:5173/admin
2. **You'll see the admin panel!** ✅
3. **You're now the admin!**

---

## 🎯 Quick Summary

1. ✅ Delete all users from Firebase Authentication
2. ✅ Delete all users from Firestore
3. ✅ Sign up again with `asadmulla241097@gmail.com`
4. ✅ Approve the account in Firestore (change status to "approved")
5. ✅ Login
6. ✅ Access admin panel at `/admin`

---

## ✅ Confirmation

**Yes, `asadmulla241097@gmail.com` is the original admin email**, so:
- ✅ It's already in the admin list in the code
- ✅ You'll have full admin access
- ✅ You can approve/deny other users
- ✅ You can access `/admin` panel

**This is a clean way to start fresh!** 🎉
