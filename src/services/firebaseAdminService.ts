import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  addDoc,
  getDoc,
  writeBatch,
  Timestamp
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser as deleteAuthUser
} from 'firebase/auth';
import { db, auth } from '../config/firebase';

export interface FirebaseUser {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'denied';
  loginMethod: 'manual' | 'google' | 'facebook';
  createdAt: string;
  approvedAt?: string;
  lastLogin?: string;
  profilePicture?: string;
  phoneNumber?: string;
  role?: 'user' | 'admin';
}

export interface UserStats {
  total: number;
  pending: number;
  approved: number;
  denied: number;
  newThisWeek: number;
  newThisMonth: number;
}

class FirebaseAdminService {
  private usersCollection = 'users';
  // Admin emails - add more admin emails here if needed
  private adminEmails = [
    'asadmulla241097@gmail.com',
    'asadmulla2407@gmail.com' // Added your current email
  ];
  
  private isAdmin(email: string): boolean {
    return this.adminEmails.includes(email);
  }

  // Check if Firebase is available
  private isFirebaseAvailable(): boolean {
    return db !== null && auth !== null;
  }

  // Get all users with optional filtering
  async getAllUsers(statusFilter?: string, searchTerm?: string): Promise<FirebaseUser[]> {
    if (!this.isFirebaseAvailable()) {
      console.warn('Firebase not available, returning mock data');
      return this.getMockUsers();
    }

    try {
      let q = query(collection(db, this.usersCollection), orderBy('createdAt', 'desc'));
      
      if (statusFilter && statusFilter !== 'all') {
        q = query(q, where('status', '==', statusFilter));
      }

      const querySnapshot = await getDocs(q);
      let users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseUser[];

      // Client-side search filtering
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        users = users.filter(user => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        );
      }

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return this.getMockUsers();
    }
  }

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    if (!this.isFirebaseAvailable()) {
      return this.getMockStats();
    }

    try {
      const users = await this.getAllUsers();
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      return {
        total: users.length,
        pending: users.filter(u => u.status === 'pending').length,
        approved: users.filter(u => u.status === 'approved').length,
        denied: users.filter(u => u.status === 'denied').length,
        newThisWeek: users.filter(u => new Date(u.createdAt) >= oneWeekAgo).length,
        newThisMonth: users.filter(u => new Date(u.createdAt) >= oneMonthAgo).length
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return this.getMockStats();
    }
  }

  // Update user status
  async updateUserStatus(userId: string, status: 'approved' | 'denied'): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      console.log(`Mock: Updated user ${userId} status to ${status}`);
      return true;
    }

    try {
      const userRef = doc(db, this.usersCollection, userId);
      const updateData: any = { 
        status,
        updatedAt: Timestamp.now()
      };

      if (status === 'approved') {
        updateData.approvedAt = Timestamp.now();
      }

      await updateDoc(userRef, updateData);
      
      // Send notification email to user
      await this.sendStatusNotificationEmail(userId, status);
      
      return true;
    } catch (error) {
      console.error('Error updating user status:', error);
      return false;
    }
  }

  // Bulk update user statuses
  async bulkUpdateUserStatus(userIds: string[], status: 'approved' | 'denied'): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      console.log(`Mock: Bulk updated ${userIds.length} users to ${status}`);
      return true;
    }

    try {
      const batch = writeBatch(db);
      const updateData: any = { 
        status,
        updatedAt: Timestamp.now()
      };

      if (status === 'approved') {
        updateData.approvedAt = Timestamp.now();
      }

      userIds.forEach(userId => {
        const userRef = doc(db, this.usersCollection, userId);
        batch.update(userRef, updateData);
      });

      await batch.commit();

      // Send notification emails
      const emailPromises = userIds.map(userId => 
        this.sendStatusNotificationEmail(userId, status)
      );
      await Promise.all(emailPromises);

      return true;
    } catch (error) {
      console.error('Error bulk updating user statuses:', error);
      return false;
    }
  }

  // Delete user
  async deleteUser(userId: string): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      console.log(`Mock: Deleted user ${userId}`);
      return true;
    }

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, this.usersCollection, userId));
      
      // Note: Deleting from Firebase Auth requires admin SDK on server-side
      // For now, we'll just delete from Firestore
      // In production, you'd want to use Firebase Admin SDK or Cloud Functions
      
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  // Get user by ID
  async getUserById(userId: string): Promise<FirebaseUser | null> {
    if (!this.isFirebaseAvailable()) {
      const mockUsers = this.getMockUsers();
      return mockUsers.find(u => u.id === userId) || null;
    }

    try {
      const userDoc = await getDoc(doc(db, this.usersCollection, userId));
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() } as FirebaseUser;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Send password reset email
  async sendPasswordReset(email: string): Promise<boolean> {
    if (!this.isFirebaseAvailable()) {
      console.log(`Mock: Sent password reset to ${email}`);
      return true;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error('Error sending password reset:', error);
      return false;
    }
  }

  // Send status notification email
  private async sendStatusNotificationEmail(userId: string, status: 'approved' | 'denied'): Promise<void> {
    try {
      const user = await this.getUserById(userId);
      if (!user) return;

      // This would typically be handled by Firebase Cloud Functions
      // For now, we'll use the existing email service
      const emailData = {
        to: user.email,
        subject: `Account ${status.charAt(0).toUpperCase() + status.slice(1)} - TechGiant`,
        html: status === 'approved' 
          ? this.getApprovedEmailTemplate(user.name)
          : this.getDeniedEmailTemplate(user.name)
      };

      // You can integrate with your existing email service here
      console.log(`Sending ${status} email to ${user.email}`, emailData);
      
      // Example: await sendEmail(emailData);
    } catch (error) {
      console.error('Error sending notification email:', error);
    }
  }

  // Email templates
  private getApprovedEmailTemplate(userName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to TechGiant!</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333;">Congratulations, ${userName}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Your TechGiant account has been approved! You can now access all our features and services.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/login" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Login to Your Account
            </a>
          </div>
          <p style="color: #666; line-height: 1.6;">
            If you have any questions, feel free to contact our support team at +91 8008771893.
          </p>
        </div>
      </div>
    `;
  }

  private getDeniedEmailTemplate(userName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #dc3545; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">TechGiant Account Update</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333;">Hello ${userName},</h2>
          <p style="color: #666; line-height: 1.6;">
            We regret to inform you that your TechGiant account application has been denied at this time.
          </p>
          <p style="color: #666; line-height: 1.6;">
            If you believe this is an error or would like more information, please contact our support team:
          </p>
          <div style="background: #e9ecef; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #333;">
              <strong>Support Contact:</strong><br>
              Phone: +91 8008771893<br>
              Email: asadmulla241097@gmail.com
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // Mock data for when Firebase is not available
  private getMockUsers(): FirebaseUser[] {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        status: 'pending',
        loginMethod: 'manual',
        createdAt: '2024-01-15T10:30:00Z',
        profilePicture: 'https://via.placeholder.com/40'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        status: 'approved',
        loginMethod: 'google',
        createdAt: '2024-01-14T15:45:00Z',
        approvedAt: '2024-01-14T16:00:00Z',
        lastLogin: '2024-01-16T09:15:00Z'
      },
      {
        id: '3',
        name: 'Mike Johnson',
        email: 'mike@example.com',
        status: 'denied',
        loginMethod: 'facebook',
        createdAt: '2024-01-13T12:20:00Z'
      },
      {
        id: '4',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        status: 'approved',
        loginMethod: 'manual',
        createdAt: '2024-01-12T08:10:00Z',
        approvedAt: '2024-01-12T08:30:00Z',
        lastLogin: '2024-01-16T14:22:00Z'
      },
      {
        id: '5',
        name: 'Alex Brown',
        email: 'alex@example.com',
        status: 'pending',
        loginMethod: 'google',
        createdAt: '2024-01-16T11:20:00Z'
      }
    ];
  }

  private getMockStats(): UserStats {
    const users = this.getMockUsers();
    return {
      total: users.length,
      pending: users.filter(u => u.status === 'pending').length,
      approved: users.filter(u => u.status === 'approved').length,
      denied: users.filter(u => u.status === 'denied').length,
      newThisWeek: 2,
      newThisMonth: 5
    };
  }
}

export const firebaseAdminService = new FirebaseAdminService();
