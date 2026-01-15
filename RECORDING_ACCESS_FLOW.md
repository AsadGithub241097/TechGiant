# 🎥 Recording Access Request Flow - Complete Guide

## 📋 Overview

This guide explains how **regular users** request access to recordings and how **admin users** grant access.

---

## 👤 For Regular Users (Requesting Access)

### Step 1: Access Your Dashboard
1. Log in to your account
2. Go to **Dashboard** (you'll be redirected after login)
3. Click on **"Recordings"** tab in the left sidebar

### Step 2: Browse Available Recordings
- You'll see all available recordings in a grid layout
- Each recording card shows:
  - **Title** and **Description**
  - **Duration** (if available)
  - **Status** (Request Access / Pending / Approved / Denied)

### Step 3: Request Access
1. Find the recording you want to watch
2. Click the **"Request Access"** button on the recording card
3. You'll see a success message: *"Access request submitted! Admin will review it."*
4. The button will change to show **"Pending"** status

### Step 4: Wait for Admin Approval
- Your request status will show as **"Pending"** (yellow badge)
- You'll receive a notification once admin approves or denies
- Check back later to see if your request was approved

### Step 5: Watch Recordings (After Approval)
- Once approved, the **"Request Access"** button changes to **"Watch"** or **"Continue"**
- Click **"Watch"** to start watching
- Click **"Continue"** if you've already started (shows your progress %)
- The video opens in a modal on the same page
- Your viewing progress is automatically tracked

### Status Indicators:
- 🟡 **Pending**: Waiting for admin approval
- 🟢 **Approved**: You can watch the recording
- 🔴 **Denied**: Access was denied (contact admin if needed)
- ⚪ **None**: You haven't requested access yet

---

## 👨‍💼 For Admin Users (Granting Access)

### Step 1: Access Admin Panel
1. Log in with an admin account
2. Go to **Admin Panel** (usually at `/admin` route)
3. Click on **"Recording Access"** tab at the top

### Step 2: View Access Requests
You'll see three sections:

#### 📋 Pending Requests
- Shows all users who have requested access
- Each request shows:
  - **User Name** and **Email**
  - **Recording Title** they requested
  - **Request Date**
  - **Approve** and **Deny** buttons

#### ✅ Approved Requests
- Shows all approved access requests
- Includes approval date and admin who approved

#### ❌ Denied Requests
- Shows all denied access requests
- Includes denial date and admin who denied

### Step 3: Approve or Deny Requests
1. Find the user request in the **"Pending Requests"** section
2. Click **"Approve"** (green button) to grant access
   - User will immediately be able to watch the recording
3. Click **"Deny"** (red button) to reject the request
   - User will see "Access Denied" status

### Step 4: Manage Recordings
- Click **"All Recordings"** tab to see all available recordings
- Click **"Add Recording"** to add new recordings
- Click **"Quick Add"** to quickly add the default recording

---

## 🔄 Complete Flow Diagram

```
┌─────────────────┐
│  Regular User   │
│   Logs In       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Goes to         │
│ Dashboard →     │
│ Recordings Tab  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Sees Available  │
│ Recordings      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Clicks          │
│ "Request Access"│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Status: Pending │
│ (Yellow Badge) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌─────────────────┐
│ Admin Sees      │◄─────│ Admin Logs In   │
│ Request in      │      │ Goes to Admin   │
│ Admin Panel     │      │ Panel →         │
│                 │      │ Recording Access│
└────────┬────────┘      └─────────────────┘
         │
         ▼
┌─────────────────┐
│ Admin Clicks    │
│ "Approve" or    │
│ "Deny"          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User Status     │
│ Updates:        │
│ ✅ Approved     │
│ ❌ Denied       │
└────────┬────────┘
         │
         ▼ (if approved)
┌─────────────────┐
│ User Can Now    │
│ Click "Watch"   │
│ and View Video  │
└─────────────────┘
```

---

## 📍 Quick Navigation

### For Users:
- **Dashboard**: `/dashboard` → Click **"Recordings"** tab
- **Request Access**: Click **"Request Access"** button on any recording card
- **Check Status**: Look at the badge/button on each recording card

### For Admins:
- **Admin Panel**: `/admin` → Click **"Recording Access"** tab
- **View Requests**: See **"Pending Requests"** section
- **Approve/Deny**: Click green **"Approve"** or red **"Deny"** buttons

---

## 🎯 Key Features

✅ **User-Friendly**: Simple "Request Access" button for users  
✅ **Admin Control**: Full approval workflow for admins  
✅ **Status Tracking**: Clear visual indicators (Pending/Approved/Denied)  
✅ **Progress Tracking**: Automatically tracks viewing progress  
✅ **Real-time Updates**: Status updates immediately after admin action  
✅ **Request History**: Admins can see all approved/denied requests  

---

## ❓ Troubleshooting

### User can't see "Request Access" button?
- Make sure you're logged in
- Check if you've already requested (status will show "Pending")
- Refresh the page

### Admin can't see requests?
- Make sure you're logged in as admin
- Check the "Recording Access" tab in Admin Panel
- Look in "Pending Requests" section

### Request stuck on "Pending"?
- Admin needs to approve/deny in Admin Panel
- Check if admin has seen the request
- Contact admin if it's been too long

---

## 📞 Need Help?

If you encounter any issues:
- Check that you're logged in with the correct account type
- Verify your account status (approved users can request access)
- Contact support if problems persist
