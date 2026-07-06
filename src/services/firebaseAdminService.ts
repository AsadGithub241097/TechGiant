import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  getDoc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { 
  sendPasswordResetEmail,
} from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { ADMIN_EMAILS, getAdminNotificationEmail } from '../utils/adminUtils';
import { parseFirestoreDate, resolveUserDisplayName } from '../utils/userDisplay';

export interface FirebaseUser {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
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

export interface AdminRegistrationNotification {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  loginMethod: string;
  createdAt: string;
  read: boolean;
  status: 'pending' | 'approved' | 'denied';
}

class FirebaseAdminService {
  private usersCollection = 'users';
  
  private isAdmin(email: string): boolean {
    return ADMIN_EMAILS.includes(email.toLowerCase());
  }

  // Check if Firebase is available
  private isFirebaseAvailable(): boolean {
    return db !== null && auth !== null;
  }

  private normalizeUser(id: string, data: Record<string, unknown>): FirebaseUser {
    const raw = data as Partial<FirebaseUser>;
    const name = resolveUserDisplayName({
      name: raw.name,
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
    });

    return {
      id,
      name,
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email ?? '',
      status: raw.status ?? 'pending',
      loginMethod: (raw.loginMethod === 'email' ? 'manual' : raw.loginMethod) ?? 'manual',
      createdAt: parseFirestoreDate(raw.createdAt as Parameters<typeof parseFirestoreDate>[0]).toISOString(),
      approvedAt: raw.approvedAt
        ? parseFirestoreDate(raw.approvedAt as Parameters<typeof parseFirestoreDate>[0]).toISOString()
        : undefined,
      lastLogin: raw.lastLogin
        ? parseFirestoreDate(raw.lastLogin as Parameters<typeof parseFirestoreDate>[0]).toISOString()
        : (raw as { lastLoginAt?: Parameters<typeof parseFirestoreDate>[0] }).lastLoginAt
          ? parseFirestoreDate(
              (raw as { lastLoginAt?: Parameters<typeof parseFirestoreDate>[0] }).lastLoginAt,
            ).toISOString()
          : undefined,
      profilePicture: raw.profilePicture,
      phoneNumber: raw.phoneNumber,
      role: raw.role,
    };
  }

  // Get all users with optional filtering
  async getAllUsers(statusFilter?: string, searchTerm?: string): Promise<FirebaseUser[]> {
    if (!this.isFirebaseAvailable()) {
      console.warn('Firebase not available');
      return [];
    }

    try {
      let q = query(collection(db, this.usersCollection), orderBy('createdAt', 'desc'));
      
      if (statusFilter && statusFilter !== 'all') {
        q = query(q, where('status', '==', statusFilter));
      }

      const querySnapshot = await getDocs(q);
      let users = querySnapshot.docs.map((userDoc) =>
        this.normalizeUser(userDoc.id, userDoc.data() as Record<string, unknown>),
      );

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        users = users.filter(user => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          (user.firstName?.toLowerCase().includes(searchLower) ?? false) ||
          (user.lastName?.toLowerCase().includes(searchLower) ?? false)
        );
      }

      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async getUsersMap(): Promise<Map<string, FirebaseUser>> {
    const users = await this.getAllUsers();
    return new Map(users.map((user) => [user.id, user]));
  }

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    if (!this.isFirebaseAvailable()) {
      return { total: 0, pending: 0, approved: 0, denied: 0, newThisWeek: 0, newThisMonth: 0 };
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
      return { total: 0, pending: 0, approved: 0, denied: 0, newThisWeek: 0, newThisMonth: 0 };
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
      const updateData: { status: 'approved' | 'denied'; updatedAt: Timestamp; approvedAt?: Timestamp } = { 
        status,
        updatedAt: Timestamp.now()
      };

      if (status === 'approved') {
        updateData.approvedAt = Timestamp.now();
      }

      await updateDoc(userRef, updateData);
      await this.resolveRegistrationNotifications(userId, status);
      
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
      const updateData: { status: 'approved' | 'denied'; updatedAt: Timestamp; approvedAt?: Timestamp } = { 
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
      return null;
    }

    try {
      const userDoc = await getDoc(doc(db, this.usersCollection, userId));
      if (userDoc.exists()) {
        return this.normalizeUser(userDoc.id, userDoc.data() as Record<string, unknown>);
      }
      return null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async getPendingRegistrationNotifications(): Promise<AdminRegistrationNotification[]> {
    if (!this.isFirebaseAvailable()) {
      return [];
    }

    try {
      let snapshot;
      try {
        const q = query(
          collection(db, 'adminNotifications'),
          where('status', '==', 'pending'),
          orderBy('createdAt', 'desc'),
        );
        snapshot = await getDocs(q);
      } catch {
        const fallbackQuery = query(collection(db, 'adminNotifications'));
        snapshot = await getDocs(fallbackQuery);
      }

      return snapshot.docs
        .filter((notificationDoc) => notificationDoc.data().status === 'pending')
        .map((notificationDoc) => {
        const data = notificationDoc.data();
        return {
          id: notificationDoc.id,
          userId: String(data.userId ?? ''),
          userName: String(data.userName ?? ''),
          userEmail: String(data.userEmail ?? ''),
          loginMethod: String(data.loginMethod ?? ''),
          createdAt: parseFirestoreDate(
            data.createdAt as Parameters<typeof parseFirestoreDate>[0],
          ).toISOString(),
          read: Boolean(data.read),
          status: (data.status as AdminRegistrationNotification['status']) ?? 'pending',
        };
      })
        .sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    } catch (error) {
      console.error('Error fetching admin notifications:', error);
      return [];
    }
  }

  private async resolveRegistrationNotifications(
    userId: string,
    status: 'approved' | 'denied',
  ): Promise<void> {
    if (!this.isFirebaseAvailable()) return;

    try {
      const q = query(
        collection(db, 'adminNotifications'),
        where('userId', '==', userId),
        where('status', '==', 'pending'),
      );
      const snapshot = await getDocs(q);
      await Promise.all(
        snapshot.docs.map((notificationDoc) =>
          updateDoc(notificationDoc.ref, {
            status,
            read: true,
            resolvedAt: Timestamp.now(),
          }),
        ),
      );
    } catch (error) {
      console.error('Error resolving admin notifications:', error);
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
    const supportEmail = getAdminNotificationEmail() || 'support@techgiant.com';
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
              Email: ${supportEmail}
            </p>
          </div>
        </div>
      </div>
    `;
  }

}

export const firebaseAdminService = new FirebaseAdminService();
