import React, { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  getDocFromServer,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  type DocumentSnapshot,
  type FieldValue,
  type Timestamp,
} from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '../config/firebase';
import { isAdmin } from '../utils/adminUtils';
import { SESSION_IDLE_TIMEOUT_MS, SESSION_MAX_DURATION_MS } from '../utils/sessionConfig';
import { buildFullName } from '../utils/userDisplay';
import { sendAdminNotificationEmail } from '../services/emailService';

// Fallback to old auth system if Firebase isn't configured
const isFirebaseAvailable = auth !== null && db !== null;

// Enhanced User interface for our application
export interface AppUser {
  uid: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: Timestamp | FieldValue | string;
  approvedAt?: Timestamp | FieldValue | string;
  loginMethod: 'email' | 'google' | 'facebook';
  emailVerified: boolean;
  lastLoginAt?: Timestamp | FieldValue | string;
}

export interface AuthContextType {
  currentUser: FirebaseUser | null;
  appUser: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  socialLogin: (provider: 'google' | 'facebook') => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FirebaseAuthStateContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(FirebaseAuthStateContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within FirebaseAuthProvider');
  }
  return context;
};

const requireEmailVerification =
  import.meta.env.VITE_REQUIRE_EMAIL_VERIFICATION === 'true';

async function syncUserProfileOnLogin(
  user: FirebaseUser,
  email: string,
  loginMethod: AppUser['loginMethod'],
): Promise<{ snap: DocumentSnapshot; created: boolean }> {
  if (!db) {
    throw new Error('Firestore is not available');
  }

  const userDocRef = doc(db, 'users', user.uid);
  const emailLower = (user.email || email).toLowerCase();
  const userIsAdmin = isAdmin(emailLower);

  let userDocSnap: DocumentSnapshot;
  try {
    userDocSnap = await getDocFromServer(userDocRef);
  } catch {
    userDocSnap = await getDoc(userDocRef);
  }

  if (!userDocSnap.exists()) {
    await setDoc(userDocRef, {
      email: user.email || email,
      name: user.displayName || '',
      ...(user.photoURL ? { profilePicture: user.photoURL } : {}),
      status: userIsAdmin ? 'approved' : 'pending',
      createdAt: serverTimestamp(),
      ...(userIsAdmin ? { approvedAt: serverTimestamp() } : {}),
      loginMethod,
      emailVerified: user.emailVerified,
      lastLoginAt: serverTimestamp(),
    });
    return { snap: await getDoc(userDocRef), created: true };
  }

  const existing = userDocSnap.data() as Omit<AppUser, 'uid'>;
  const updates: Record<string, unknown> = { lastLoginAt: serverTimestamp() };
  if (userIsAdmin && existing.status === 'pending') {
    updates.status = 'approved';
    updates.approvedAt = serverTimestamp();
  }

  await setDoc(userDocRef, updates, { merge: true });
  return { snap: await getDoc(userDocRef), created: false };
}

export const FirebaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const firestoreUserUnsubRef = useRef<(() => void) | null>(null);
  const sessionStartedAtRef = useRef<number | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const emailGateOk =
    !requireEmailVerification || currentUser?.emailVerified === true;

  const isAuthenticated =
    currentUser !== null &&
    appUser?.status === 'approved' &&
    emailGateOk;

  useEffect(() => {
    if (!isFirebaseAvailable || !auth || !db) {
      console.warn('Firebase not available');
      setIsLoading(false);
      return;
    }

    try {
      const unsubscribeAuth = onAuthStateChanged(
        auth,
        (user) => {
          if (firestoreUserUnsubRef.current) {
            firestoreUserUnsubRef.current();
            firestoreUserUnsubRef.current = null;
          }

          setCurrentUser(user);

          if (user && db) {
            const userDocRef = doc(db, 'users', user.uid);
            const unsub = onSnapshot(
              userDocRef,
              (docSnapshot) => {
                if (docSnapshot.exists()) {
                  setAppUser({ uid: user.uid, ...docSnapshot.data() } as AppUser);
                } else {
                  setAppUser(null);
                }
                setIsLoading(false);
              },
              (error) => {
                console.error('Error listening to user document:', error);
                setAppUser(null);
                setIsLoading(false);
              },
            );
            firestoreUserUnsubRef.current = unsub;
          } else {
            setAppUser(null);
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error in auth state change:', error);
          setCurrentUser(null);
          setAppUser(null);
          setIsLoading(false);
        },
      );

      return () => {
        if (firestoreUserUnsubRef.current) {
          firestoreUserUnsubRef.current();
          firestoreUserUnsubRef.current = null;
        }
        unsubscribeAuth();
      };
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      setIsLoading(false);
    }
  }, []);

  const forceSessionLogout = useCallback(async (reason: string) => {
    if (!auth) return;
    try {
      await signOut(auth);
      if (import.meta.env.DEV) {
        console.info('Session ended:', reason);
      }
    } catch (error) {
      console.error('Forced session logout failed:', error);
    }
  }, []);

  useEffect(() => {
    if (!currentUser || !appUser || appUser.status !== 'approved') {
      sessionStartedAtRef.current = null;
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      return;
    }

    if (!sessionStartedAtRef.current) {
      sessionStartedAtRef.current = Date.now();
    }

    const scheduleIdleLogout = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }

      const sessionStartedAt = sessionStartedAtRef.current ?? Date.now();
      const elapsed = Date.now() - sessionStartedAt;
      const remainingMax = SESSION_MAX_DURATION_MS - elapsed;

      if (remainingMax <= 0) {
        void forceSessionLogout('maximum session duration reached');
        return;
      }

      idleTimerRef.current = setTimeout(() => {
        void forceSessionLogout('inactivity timeout');
      }, Math.min(SESSION_IDLE_TIMEOUT_MS, remainingMax));
    };

    const onActivity = () => scheduleIdleLogout();
    const activityEvents: Array<keyof WindowEventMap> = [
      'mousedown',
      'keydown',
      'scroll',
      'touchstart',
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, onActivity, { passive: true });
    });
    scheduleIdleLogout();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, onActivity);
      });
    };
  }, [currentUser, appUser, forceSessionLogout]);

  const signup = async (userData: SignupData): Promise<{ success: boolean; message: string }> => {
    if (!isFirebaseAvailable || !auth || !db) {
      return {
        success: false,
        message: 'Firebase is not configured. Please set up your Firebase credentials in the .env file.'
      };
    }
    
    setIsLoading(true);
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: userData.name
      });

      // Send email verification
      await sendEmailVerification(user);

      const approved = isAdmin(userData.email);
      const fullName = buildFullName(userData.firstName, userData.lastName) || userData.name;
      const userDoc: Omit<AppUser, 'uid'> = {
        email: userData.email,
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        name: fullName,
        status: approved ? 'approved' : 'pending',
        createdAt: serverTimestamp(),
        ...(approved ? { approvedAt: serverTimestamp() } : {}),
        loginMethod: 'email',
        emailVerified: false
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);

      const notificationUser: AppUser = {
        uid: user.uid,
        ...userDoc,
        createdAt: new Date().toISOString(),
      };
      await sendAdminNotification(notificationUser);

      if (!approved) {
        await signOut(auth);
      }

      return {
        success: true,
        message: approved
          ? 'Account created successfully! You can sign in with your admin account.'
          : 'Account created successfully! Please check your email to verify your account and wait for admin approval.'
      };
    } catch (error: unknown) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: getErrorMessage(error)
      };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    if (!isFirebaseAvailable || !auth || !db) {
      return {
        success: false,
        message: 'Firebase is not configured. Please set up your Firebase credentials in the .env file.'
      };
    }
    
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { snap: userDocSnap } = await syncUserProfileOnLogin(user, email, 'email');

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data() as Omit<AppUser, 'uid'>;

        if (userData.status === 'pending') {
          await signOut(auth);
          return {
            success: false,
            message: 'Your account is pending admin approval. Please wait for confirmation.'
          };
        }

        if (userData.status === 'denied') {
          await signOut(auth);
          return {
            success: false,
            message: 'Your account has been denied. Please contact support at +91 8008771893.'
          };
        }
      }

      return {
        success: true,
        message: 'Login successful!'
      };
    } catch (error: unknown) {
      console.error('Login error:', error);
      return {
        success: false,
        message: getErrorMessage(error)
      };
    } finally {
      setIsLoading(false);
    }
  };

  const socialLogin = async (provider: 'google' | 'facebook'): Promise<{ success: boolean; message: string }> => {
    if (!isFirebaseAvailable || !auth || !db) {
      return {
        success: false,
        message: 'Firebase is not configured. Please set up your Firebase credentials in the .env file.'
      };
    }
    
    const authProvider = provider === 'google' ? googleProvider : facebookProvider;
    if (!authProvider) {
      return {
        success: false,
        message: `${provider === 'google' ? 'Google' : 'Facebook'} authentication is not available.`
      };
    }
    
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;
      const socialIsAdmin = isAdmin((user.email || '').toLowerCase());

      const { snap: userDocSnap, created } = await syncUserProfileOnLogin(
        user,
        user.email || '',
        provider,
      );

      if (created && !socialIsAdmin) {
        const userDocData = userDocSnap.data() as Omit<AppUser, 'uid'>;
        await sendAdminNotification({
          uid: user.uid,
          ...userDocData,
          createdAt: new Date().toISOString()
        } as AppUser);

        await signOut(auth);
        return {
          success: false,
          message: 'Account created! Please wait for admin approval before you can access the dashboard.'
        };
      }

      if (userDocSnap.exists()) {
        const latest = userDocSnap.data() as Omit<AppUser, 'uid'>;

        if (latest.status === 'pending') {
          await signOut(auth);
          return {
            success: false,
            message: 'Your account is pending admin approval. Please wait for confirmation.'
          };
        }

        if (latest.status === 'denied') {
          await signOut(auth);
          return {
            success: false,
            message: 'Your account has been denied. Please contact support at +91 8008771893.'
          };
        }
      }

      return {
        success: true,
        message: 'Login successful!'
      };
    } catch (error: unknown) {
      console.error('Social login error:', error);
      return {
        success: false,
        message: getErrorMessage(error)
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    if (!isFirebaseAvailable || !auth) {
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    if (!isFirebaseAvailable || !auth) {
      return {
        success: false,
        message: 'Firebase is not configured. Please set up your Firebase credentials in the .env file.'
      };
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      return {
        success: true,
        message: 'Password reset email sent! Check your inbox (and spam folder).'
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error)
      };
    }
  };

  const resendVerificationEmail = async (): Promise<{ success: boolean; message: string }> => {
    if (!isFirebaseAvailable || !auth) {
      return {
        success: false,
        message: 'Firebase is not configured. Please set up your Firebase credentials in the .env file.'
      };
    }
    
    try {
      if (currentUser) {
        await sendEmailVerification(currentUser);
        return {
          success: true,
          message: 'Verification email sent! Please check your inbox.'
        };
      }
      return {
        success: false,
        message: 'No user logged in.'
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error)
      };
    }
  };

  const sendAdminNotification = async (user: AppUser) => {
    if (!db) return;
    try {
      await addDoc(collection(db, 'adminNotifications'), {
        type: 'new_registration',
        userId: user.uid,
        userName: user.name,
        userEmail: user.email,
        loginMethod: user.loginMethod,
        createdAt: serverTimestamp(),
        read: false,
        status: 'pending'
      });

      const createdAt =
        typeof user.createdAt === 'string'
          ? user.createdAt
          : new Date().toISOString();

      await sendAdminNotificationEmail({
        user: {
          id: user.uid,
          name: user.name,
          email: user.email,
          status: user.status,
          createdAt,
          loginMethod: user.loginMethod === 'email' ? 'email' : user.loginMethod,
        },
      });
    } catch (error) {
      console.error('Error sending admin notification:', error);
    }
  };

  const getErrorMessage = (error: unknown): string => {
    const firebaseError = error as { code?: string; message?: string };
    switch (firebaseError.code) {
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
        return 'Email or password is incorrect, or no account exists for this email. Double-check spelling, or sign up if you are new.';
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in popup was closed. Please try again.';
      case 'auth/cancelled-popup-request':
        return 'Sign-in was cancelled. Please try again.';
      case 'permission-denied':
        return 'Database access denied. Deploy Firestore rules (firebase deploy --only firestore:rules) or paste firestore.rules into Firebase Console → Firestore → Rules.';
      case 'not-found':
        return 'Your account profile was missing and could not be updated. Please try logging in again.';
      default:
        return firebaseError.message || 'An unexpected error occurred.';
    }
  };

  const value: AuthContextType = {
    currentUser,
    appUser,
    isLoading,
    isAuthenticated,
    login,
    signup,
    socialLogin,
    logout,
    resendVerificationEmail,
    resetPassword
  };

  return (
    <FirebaseAuthStateContext.Provider value={value}>{children}</FirebaseAuthStateContext.Provider>
  );
};
