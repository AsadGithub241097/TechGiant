# Email Notifications Setup Guide

To receive real email notifications at `asadmulla241097@gmail.com` when users register, you need to configure an email service. Here are the easiest options:

## Option 1: EmailJS (Recommended - Free Tier Available)

1. **Create EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service**
   - Go to Email Services
   - Add Gmail service
   - Connect your `asadmulla241097@gmail.com` account

3. **Create Email Template**
   - Go to Email Templates
   - Create a new template with these variables:
   ```
   Subject: New User Registration - {{user_name}}
   
   Hi Admin,
   
   A new user has registered on TechGiant:
   
   Name: {{user_name}}
   Email: {{user_email}}
   Login Method: {{login_method}}
   Registration Date: {{registration_date}}
   
   Please review and approve/deny this user:
   Approve: {{approval_url}}
   Deny: {{deny_url}}
   
   Best regards,
   TechGiant System
   ```

4. **Get Your Keys**
   - Copy your Service ID, Template ID, and Public Key
   - Update `src/services/emailService.ts`:
   ```typescript
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```

## Option 2: Formspree (Simplest Setup)

1. **Create Formspree Account**
   - Go to [https://formspree.io/](https://formspree.io/)
   - Sign up for free

2. **Create New Form**
   - Create a form for `asadmulla241097@gmail.com`
   - Copy the form endpoint URL

3. **Update Code**
   - In `src/services/emailService.ts`, replace:
   ```typescript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

## Option 3: Backend API with Nodemailer

If you want to set up your own backend:

1. **Create Express Server**
   ```javascript
   const express = require('express');
   const nodemailer = require('nodemailer');
   const app = express();
   
   app.post('/send-notification', async (req, res) => {
     const { user } = req.body;
     
     const transporter = nodemailer.createTransporter({
       service: 'gmail',
       auth: {
         user: 'your-email@gmail.com',
         pass: 'your-app-password'
       }
     });
     
     await transporter.sendMail({
       from: 'your-email@gmail.com',
       to: 'asadmulla241097@gmail.com',
       subject: `New User Registration - ${user.name}`,
       html: `
         <h2>New User Registration</h2>
         <p><strong>Name:</strong> ${user.name}</p>
         <p><strong>Email:</strong> ${user.email}</p>
         <p><strong>Login Method:</strong> ${user.loginMethod}</p>
         <p><strong>Registration Date:</strong> ${user.createdAt}</p>
         <br>
         <a href="${process.env.FRONTEND_URL}/admin/approve/${user.id}" style="background: green; color: white; padding: 10px; text-decoration: none;">Approve</a>
         <a href="${process.env.FRONTEND_URL}/admin/deny/${user.id}" style="background: red; color: white; padding: 10px; text-decoration: none;">Deny</a>
       `
     });
     
     res.json({ success: true });
   });
   ```

2. **Update Frontend**
   - Update the fetch URL in `emailService.ts` to your backend endpoint

## Testing the Setup

1. **Test Registration**
   - Go to `/login` and create a new account
   - Check if email is received at `asadmulla241097@gmail.com`

2. **Admin Panel**
   - Go to `/admin` to see all registered users
   - Approve/deny users manually

3. **User Experience**
   - Users will see pending status until approved
   - Approved users can access dashboard
   - Denied users get contact support message

## Current Status

- ✅ Email service infrastructure is ready
- ✅ Admin panel is available at `/admin`
- ✅ User approval/denial system works
- ⏳ **Need to configure email service** (choose one option above)

## Quick Start (5 minutes with Formspree)

1. Go to [formspree.io](https://formspree.io)
2. Create form for `asadmulla241097@gmail.com`
3. Copy form URL
4. Update line 45 in `src/services/emailService.ts`
5. Test by registering a new user

That's it! You'll start receiving email notifications immediately.
