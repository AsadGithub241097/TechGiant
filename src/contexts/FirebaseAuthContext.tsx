import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '../config/firebase';

// Fallback to old auth system if Firebase isn't configured
const isFirebaseAvailable = auth !== null && db !== null;

// Enhanced User interface for our application
export interface AppUser {
  uid: string;
  email: string;
  name: string;
  profilePicture?: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: any;
  approvedAt?: any;
  loginMethod: 'email' | 'google' | 'facebook';
  emailVerified: boolean;
  lastLoginAt?: any;
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
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const FirebaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Temporarily disabled email verification check for development
  // TODO: Re-enable email verification for production: && currentUser.emailVerified
  const isAuthenticated = currentUser !== null && appUser?.status === 'approved';

  useEffect(() => {
    if (!isFirebaseAvailable || !auth || !db) {
      console.warn('Firebase not available, falling back to localStorage auth');
      setIsLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        
        if (user && db) {
          // Listen to user document changes in Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const unsubscribeUser = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              setAppUser({ uid: user.uid, ...docSnapshot.data() } as AppUser);
            } else {
              setAppUser(null);
            }
            setIsLoading(false);
          }, (error) => {
            console.error('Error listening to user document:', error);
            setAppUser(null);
            setIsLoading(false);
          });
          
          return () => unsubscribeUser();
        } else {
          setAppUser(null);
          setIsLoading(false);
        }
      }, (error) => {
        console.error('Error in auth state change:', error);
        setCurrentUser(null);
        setAppUser(null);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
      setIsLoading(false);
    }
  }, []);

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

      // Create user document in Firestore
      const userDoc: Omit<AppUser, 'uid'> = {
        email: userData.email,
        name: userData.name,
        status: 'pending',
        createdAt: serverTimestamp(),
        loginMethod: 'email',
        emailVerified: false
      };

      await setDoc(doc(db, 'users', user.uid), userDoc);

      // Send admin notification
      await sendAdminNotification({
        uid: user.uid,
        ...userDoc,
        createdAt: new Date().toISOString()
      } as AppUser);

      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account and wait for admin approval.'
      };
    } catch (error: any) {
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

      // Temporarily disabled email verification for development
      // TODO: Re-enable email verification for production
      // if (!user.emailVerified) {
      //   await signOut(auth);
      //   return {
      //     success: false,
      //     message: 'Please verify your email address before logging in. Check your inbox for the verification link.'
      //   };
      // }

      // Update last login time
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        lastLoginAt: serverTimestamp()
      });

      // Get user document to check status
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as Omit<AppUser, 'uid'>;
        
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
    } catch (error: any) {
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

      // Check if user document exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create new user document
        const userDocData: Omit<AppUser, 'uid'> = {
          email: user.email || '',
          name: user.displayName || '',
          profilePicture: user.photoURL || undefined,
          status: 'pending',
          createdAt: serverTimestamp(),
          loginMethod: provider,
          emailVerified: user.emailVerified
        };

        await setDoc(userDocRef, userDocData);

        // Send admin notification
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
      } else {
        // Update last login time
        await updateDoc(userDocRef, {
          lastLoginAt: serverTimestamp()
        });

        const userData = userDoc.data() as Omit<AppUser, 'uid'>;
        
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
    } catch (error: any) {
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
    } catch (error: any) {
      return {
        success: false,
        message: getErrorMessage(error)
      };
    }
  };

  const sendAdminNotification = async (user: AppUser) => {
    try {
      // Add notification to Firestore
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

      console.log('✅ Admin notification added to Firestore for user:', user.name);
    } catch (error) {
      console.error('Error sending admin notification:', error);
    }
  };

  const getErrorMessage = (error: any): string => {
    switch (error.code) {
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
      default:
        return error.message || 'An unexpected error occurred.';
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
    resendVerificationEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
