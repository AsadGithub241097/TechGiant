# 👤 Create Your Admin Account - Step by Step

Since you don't have an admin account yet, let's create one and approve it!

## ✅ Step 1: Create Admin Account

1. **Go to**: http://localhost:5173/login
2. **Click "Create an account"** (or the signup link)
3. **Fill in the form**:
   - **Name**: Your name (e.g., "Asad Mulla")
   - **Email**: `asadmulla241097@gmail.com` (this is the admin email)
   - **Password**: Choose a secure password
   - **Confirm Password**: Same password
4. **Check the "Terms & Conditions"** box
5. **Click "Create account"**

You'll see: "Account created! Please wait for admin approval..."

## ✅ Step 2: Approve Your Admin Account in Firebase

Now we need to manually approve your account so you can become admin:

1. **Go to Firebase Console**: 
   https://console.firebase.google.com/project/tech-giant-880c8/firestore

2. **Click "Firestore Database"** in the left sidebar

3. **Click on "users" collection** (if you don't see it, wait a few seconds and refresh)

4. **Find your account**:
   - Look for a document with email: `asadmulla241097@gmail.com`
   - Or look for your name

5. **Click on the document** to open it

6. **Edit the document**:
   - Find the field called **"status"**
   - Change it from `"pending"` to `"approved"`
   - Click **"Update"** button

## ✅ Step 3: Login as Admin

1. **Go back to your app**: http://localhost:5173/login
2. **Login** with:
   - Email: `asadmulla241097@gmail.com`
   - Password: (the one you just created)
3. **You should now be logged in!**

## ✅ Step 4: Access Admin Panel

1. **After logging in, go to**: http://localhost:5173/admin
2. **You'll see the admin panel** with all users
3. **You can now approve/deny other users!**

---

## 🎯 Quick Summary

1. **Create account** at `/login` with email `asadmulla241097@gmail.com`
2. **Go to Firebase Console** → Firestore → users collection
3. **Find your account** and change status to `"approved"`
4. **Login** at `/login`
5. **Access admin panel** at `/admin`

That's it! Once you do this, you'll be the admin and can approve all other users! 🎉
