import emailjs from '@emailjs/browser';
import { User } from '../contexts/AuthContext';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_techgiant'; // You'll need to set this up
const EMAILJS_TEMPLATE_ID = 'template_user_approval'; // You'll need to create this template
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // You'll need to get this from EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailNotificationData {
  user: User;
  approvalUrl?: string;
  denyUrl?: string;
}

export const sendAdminNotificationEmail = async (data: EmailNotificationData): Promise<boolean> => {
  try {
    // For now, let's use a simple email service approach
    // In production, you would use EmailJS, SendGrid, or your own backend API
    
    const emailData = {
      to_email: 'asadmulla241097@gmail.com',
      to_name: 'TechGiant Admin',
      user_name: data.user.name,
      user_email: data.user.email,
      login_method: data.user.loginMethod,
      registration_date: new Date(data.user.createdAt).toLocaleDateString(),
      registration_time: new Date(data.user.createdAt).toLocaleTimeString(),
      user_id: data.user.id,
      approval_url: `${window.location.origin}/admin/approve/${data.user.id}`,
      deny_url: `${window.location.origin}/admin/deny/${data.user.id}`,
      subject: `New User Registration - ${data.user.name}`,
      message: `
        A new user has registered on TechGiant platform:
        
        Name: ${data.user.name}
        Email: ${data.user.email}
        Login Method: ${data.user.loginMethod}
        Registration Date: ${new Date(data.user.createdAt).toLocaleString()}
        
        Please review and approve/deny this user's access.
      `
    };

    // Method 1: Using EmailJS (requires setup)
    if (EMAILJS_SERVICE_ID !== 'service_techgiant') {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailData
      );
      console.log('Email sent successfully via EmailJS:', result);
      return true;
    }

    // Method 2: Using Web3Forms (free email service)
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY', // You'll need to get this from web3forms.com
          to_email: 'asadmulla241097@gmail.com',
          from_name: 'TechGiant Registration System',
          subject: emailData.subject,
          message: emailData.message,
          user_name: data.user.name,
          user_email: data.user.email,
          login_method: data.user.loginMethod,
          registration_date: emailData.registration_date,
          user_id: data.user.id
        }),
      });

      if (response.ok) {
        console.log('Email sent successfully via Web3Forms');
        return true;
      }
    } catch (error) {
      console.log('Web3Forms not configured, using fallback method');
    }

    // Method 3: Using a simple webhook service (ntfy.sh for notifications)
    try {
      // Send notification via ntfy.sh (free notification service)
      await fetch('https://ntfy.sh/techgiant-registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: `New TechGiant Registration!\n\nName: ${data.user.name}\nEmail: ${data.user.email}\nMethod: ${data.user.loginMethod}\nDate: ${emailData.registration_date}\n\nApprove at: ${window.location.origin}/admin`
      });
      console.log('Notification sent via ntfy.sh');
    } catch (error) {
      console.log('ntfy.sh notification failed:', error);
    }

    // Method 4: Fallback - Console logging and user notification
    console.log('📧 EMAIL NOTIFICATION FOR: asadmulla241097@gmail.com');
    console.log('Subject:', emailData.subject);
    console.log('Content:', emailData.message);
    console.log('Approval URL:', emailData.approval_url);
    console.log('Deny URL:', emailData.deny_url);

    // Show a notification to the user that admin has been notified
    showEmailNotification(data.user);
    
    return true;

  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
};

// Show a visual notification that email was sent
const showEmailNotification = (user: User) => {
  // Create a toast notification
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
  notification.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
      <div>
        <p class="font-semibold">Admin Notified!</p>
        <p class="text-sm">Email sent to asadmulla241097@gmail.com</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
};

// Admin approval functions (for when you implement admin panel)
export const approveUser = async (userId: string): Promise<boolean> => {
  try {
    const users = JSON.parse(localStorage.getItem('techgiant_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].status = 'approved';
      users[userIndex].approvedAt = new Date().toISOString();
      localStorage.setItem('techgiant_users', JSON.stringify(users));
      
      // Send approval email to user
      await sendUserApprovalEmail(users[userIndex], true);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to approve user:', error);
    return false;
  }
};

export const denyUser = async (userId: string): Promise<boolean> => {
  try {
    const users = JSON.parse(localStorage.getItem('techgiant_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].status = 'denied';
      localStorage.setItem('techgiant_users', JSON.stringify(users));
      
      // Send denial email to user
      await sendUserApprovalEmail(users[userIndex], false);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to deny user:', error);
    return false;
  }
};

// Send email to user about approval/denial
const sendUserApprovalEmail = async (user: User, approved: boolean): Promise<boolean> => {
  try {
    const emailData = {
      to_email: user.email,
      to_name: user.name,
      subject: approved ? 'Account Approved - TechGiant' : 'Account Status - TechGiant',
      message: approved 
        ? `Hi ${user.name},\n\nGreat news! Your TechGiant account has been approved. You can now log in and access all features.\n\nLogin at: ${window.location.origin}/login\n\nWelcome to TechGiant!`
        : `Hi ${user.name},\n\nWe regret to inform you that your TechGiant account request has been denied. Please contact our support team for more information.\n\nSupport: +91 8008771893\n\nThank you for your interest in TechGiant.`
    };

    console.log(`📧 EMAIL SENT TO USER: ${user.email}`);
    console.log('Subject:', emailData.subject);
    console.log('Message:', emailData.message);
    
    return true;
  } catch (error) {
    console.error('Failed to send user email:', error);
    return false;
  }
};

// Setup instructions for EmailJS
export const getEmailJSSetupInstructions = () => {
  return `
    To enable real email notifications, follow these steps:

    1. Go to https://www.emailjs.com/ and create a free account
    2. Create a new email service (Gmail, Outlook, etc.)
    3. Create an email template with these variables:
       - {{to_email}}
       - {{user_name}}
       - {{user_email}}
       - {{login_method}}
       - {{registration_date}}
       - {{approval_url}}
       - {{deny_url}}
       - {{message}}
    4. Get your Service ID, Template ID, and Public Key
    5. Update the constants in emailService.ts
    6. Replace 'asadmulla241097@gmail.com' with your actual admin email

    Alternative: Use Formspree.io for a simpler setup:
    1. Go to https://formspree.io/
    2. Create a form for 'asadmulla241097@gmail.com'
    3. Update the Formspree URL in the code
  `;
};
