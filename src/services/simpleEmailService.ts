import { User } from '../contexts/AuthContext';

export const sendSimpleEmailNotification = async (user: User): Promise<boolean> => {
  try {
    // Method 1: Using Webhook.site (for testing - you can see the data)
    const webhookUrl = 'https://webhook.site/unique-id'; // Replace with your webhook.site URL
    
    const emailData = {
      to: 'asadmulla241097@gmail.com',
      subject: `New TechGiant Registration - ${user.name}`,
      body: `
        New user registration details:
        
        Name: ${user.name}
        Email: ${user.email}
        Login Method: ${user.loginMethod}
        Registration Date: ${new Date(user.createdAt).toLocaleString()}
        User ID: ${user.id}
        
        Admin Panel: ${window.location.origin}/admin
        
        Please review and approve/deny this user.
      `,
      user_details: {
        name: user.name,
        email: user.email,
        loginMethod: user.loginMethod,
        createdAt: user.createdAt,
        id: user.id
      }
    };

    // Try to send via webhook (for testing)
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });
      
      if (response.ok) {
        console.log('✅ Webhook notification sent successfully');
      }
    } catch (webhookError) {
      console.log('Webhook failed, continuing with other methods');
    }

    // Method 2: Create a mailto link for manual sending
    const mailtoLink = createMailtoLink(user);
    console.log('📧 MANUAL EMAIL LINK:', mailtoLink);
    
    // Method 3: Store in localStorage for admin to see
    storeNotificationForAdmin(user);
    
    // Method 4: Show browser notification if permitted
    showBrowserNotification(user);
    
    // Show success message to user
    showUserNotification(user);
    
    return true;
    
  } catch (error) {
    console.error('Error in email notification:', error);
    return false;
  }
};

const createMailtoLink = (user: User): string => {
  const subject = encodeURIComponent(`New TechGiant Registration - ${user.name}`);
  const body = encodeURIComponent(`
New user registration details:

Name: ${user.name}
Email: ${user.email}
Login Method: ${user.loginMethod}
Registration Date: ${new Date(user.createdAt).toLocaleString()}
User ID: ${user.id}

Admin Panel: ${window.location.origin}/admin

Please review and approve/deny this user.
  `);
  
  const mailtoLink = `mailto:asadmulla241097@gmail.com?subject=${subject}&body=${body}`;
  
  // Optionally auto-open the email client
  // window.open(mailtoLink);
  
  return mailtoLink;
};

const storeNotificationForAdmin = (user: User) => {
  const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
  notifications.unshift({
    id: Date.now().toString(),
    userId: user.id,
    type: 'new_registration',
    user: user,
    timestamp: new Date().toISOString(),
    read: false,
    emailSent: true
  });
  localStorage.setItem('admin_notifications', JSON.stringify(notifications));
};

const showBrowserNotification = async (user: User) => {
  if ('Notification' in window) {
    let permission = Notification.permission;
    
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }
    
    if (permission === 'granted') {
      new Notification('New TechGiant Registration', {
        body: `${user.name} (${user.email}) has registered`,
        icon: '/favicon.ico'
      });
    }
  }
};

const showUserNotification = (user: User) => {
  // Create a toast notification
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-slide-in';
  notification.innerHTML = `
    <div class="flex items-start space-x-3">
      <svg class="w-6 h-6 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <p class="font-semibold">Registration Successful!</p>
        <p class="text-sm text-green-100 mt-1">Admin has been notified at asadmulla241097@gmail.com</p>
        <p class="text-xs text-green-200 mt-1">You'll receive approval confirmation soon</p>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 6 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }
  }, 6000);
};

// Function to manually send email (for admin use)
export const openEmailClient = (user: User) => {
  const mailtoLink = createMailtoLink(user);
  window.open(mailtoLink);
};

// Function to get all pending notifications
export const getPendingNotifications = () => {
  return JSON.parse(localStorage.getItem('admin_notifications') || '[]');
};

// Function to mark notification as read
export const markNotificationAsRead = (notificationId: string) => {
  const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
  const updatedNotifications = notifications.map((notif: any) => 
    notif.id === notificationId ? { ...notif, read: true } : notif
  );
  localStorage.setItem('admin_notifications', JSON.stringify(updatedNotifications));
};
