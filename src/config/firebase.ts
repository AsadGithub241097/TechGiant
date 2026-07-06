import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getFunctions, type Functions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:demo123",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DEMO123",
};

if (import.meta.env.DEV) {
  console.log("Firebase:", {
    hasApiKey: Boolean(import.meta.env.VITE_FIREBASE_API_KEY),
    isDemoConfig: firebaseConfig.apiKey === "demo-api-key",
  });
}

const isFirebaseConfigured =
  firebaseConfig.apiKey !== "demo-api-key" && firebaseConfig.apiKey !== "your-api-key-here";

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let functions: Functions | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let facebookProvider: FacebookAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    functions = getFunctions(app);

    googleProvider = new GoogleAuthProvider();
    facebookProvider = new FacebookAuthProvider();

    googleProvider.addScope("email");
    googleProvider.addScope("profile");

    facebookProvider.addScope("email");
    facebookProvider.addScope("public_profile");

    if (import.meta.env.DEV) {
      console.log("Firebase initialized");
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    app = null;
    auth = null;
    db = null;
    functions = null;
    googleProvider = null;
    facebookProvider = null;
  }
} else {
  console.warn("Firebase not configured. Set VITE_FIREBASE_* in .env.local");
}

export { auth, db, functions, googleProvider, facebookProvider };

export default app;
