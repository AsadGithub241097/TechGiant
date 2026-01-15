# ✅ How to Approve Users - Admin Panel Guide

Great! Your account was created successfully! Now you need to approve it (or have an admin approve it).

## 🎯 Where to Check and Approve Users

### Option 1: Admin Panel in Your App (Recommended)

1. **Go to**: http://localhost:5173/admin
   - This is the admin panel in your app
   - You need to be logged in as admin to access it

2. **Login as Admin First**:
   - Go to: http://localhost:5173/login
   - Login with admin email: `asadmulla241097@gmail.com`
   - After login, go to: http://localhost:5173/admin

3. **In the Admin Panel**:
   - You'll see a list of all users
   - Find users with status "pending"
   - Click "Approve" button next to the user
   - User will be able to access the dashboard after approval

### Option 2: Firebase Console (Alternative)

1. **Go to Firebase Console**: https://console.firebase.google.com/project/tech-giant-880c8/firestore
2. **Click on "Firestore Database"** in the left sidebar
3. **Click on "users" collection**
4. **Find the user document** (it will have the user's email)
5. **Click on the document** to edit it
6. **Change the "status" field** from `"pending"` to `"approved"`
7. **Click "Update"**

## 🔐 Admin Login Setup

To access the admin panel, you need to:

1. **Make sure you have an admin account**:
   - The admin email is: `asadmulla241097@gmail.com`
   - If you don't have an account with this email, create one first

2. **Login as admin**:
   - Go to: http://localhost:5173/login
   - Login with the admin email
   - After login, navigate to: http://localhost:5173/admin

## 📋 Step-by-Step: Approve Your First User

### Method 1: Using Admin Panel (Easiest)

1. **Create admin account** (if you don't have one):
   - Go to: http://localhost:5173/login
   - Click "Create an account"
   - Use email: `asadmulla241097@gmail.com`
   - Complete signup

2. **Manually approve admin account in Firebase**:
   - Go to: https://console.firebase.google.com/project/tech-giant-880c8/firestore
   - Open "users" collection
   - Find your admin account document
   - Change status from "pending" to "approved"

3. **Login as admin**:
   - Go to: http://localhost:5173/login
   - Login with admin email
   - You should now be able to access dashboard

4. **Access admin panel**:
   - Go to: http://localhost:5173/admin
   - You'll see all pending users
   - Click "Approve" on any user you want to approve

### Method 2: Direct Firebase Approval (Quick)

1. **Go to Firebase Console**: https://console.firebase.google.com/project/tech-giant-880c8/firestore
2. **Click "Firestore Database"**
3. **Click "users" collection**
4. **Find the user** (by email or name)
5. **Click on the document**
6. **Edit the "status" field**: Change `pending` to `approved`
7. **Click "Update"**
8. **User can now login!**

## ✅ What Happens After Approval

Once a user is approved:
- ✅ They can login successfully
- ✅ They can access the dashboard at `/dashboard`
- ✅ Their status changes from "pending" to "approved"
- ✅ They receive an email notification (if email service is set up)

## 🎯 Quick Summary

**To approve users, you have 2 options:**

1. **Admin Panel** (http://localhost:5173/admin) - Best for regular use
2. **Firebase Console** - Quick one-time approval

**To access admin panel:**
- Login with admin email: `asadmulla241097@gmail.com`
- Then go to: http://localhost:5173/admin

---

## 🆘 Need Help?

If you can't access the admin panel:
1. Make sure you're logged in
2. Make sure your account email is `asadmulla241097@gmail.com`
3. Make sure your account status is "approved" in Firestore
4. Try the Firebase Console method instead

Let me know if you need help with any step!
