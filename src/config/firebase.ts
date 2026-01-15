import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Firebase configuration - Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:demo123",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DEMO123"
};

// Debug: Check if environment variables are loaded
if (import.meta.env.DEV) {
  console.log('🔍 Firebase Config Debug:', {
    apiKey: firebaseConfig.apiKey?.substring(0, 20) + '...',
    hasApiKey: !!firebaseConfig.apiKey,
    isDemo: firebaseConfig.apiKey === 'demo-api-key',
    envLoaded: !!import.meta.env.VITE_FIREBASE_API_KEY,
    envValue: import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 20) + '...'
  });
}

// Check if Firebase is properly configured
const isFirebaseConfigured = firebaseConfig.apiKey !== "demo-api-key" && 
                             firebaseConfig.apiKey !== "your-api-key-here";

// Initialize Firebase only if properly configured
let app: any = null;
let auth: any = null;
let db: any = null;
let functions: any = null;
let googleProvider: GoogleAuthProvider | null = null;
let facebookProvider: FacebookAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    functions = getFunctions(app);
    
    // Configure authentication providers only if Firebase is initialized
    googleProvider = new GoogleAuthProvider();
    facebookProvider = new FacebookAuthProvider();
    
    // Configure Google provider
    googleProvider.addScope('email');
    googleProvider.addScope('profile');
    
    // Configure Facebook provider
    facebookProvider.addScope('email');
    facebookProvider.addScope('public_profile');
    
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    // Ensure all values are null if initialization fails
    app = null;
    auth = null;
    db = null;
    functions = null;
    googleProvider = null;
    facebookProvider = null;
  }
} else {
  console.warn('⚠️ Firebase not configured. Using fallback authentication system.');
  console.warn('⚠️ Please set up Firebase environment variables in .env file');
}

export { auth, db, functions, googleProvider, facebookProvider };

export default app;
