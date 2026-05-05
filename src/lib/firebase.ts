import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDxV9S1ucwMKJk1hj_S3BUA5QpWbvDvOdo",
  authDomain: "sito-boldrini.firebaseapp.com",
  projectId: "sito-boldrini",
  storageBucket: "sito-boldrini.firebasestorage.app",
  messagingSenderId: "468684108478",
  appId: "1:468684108478:web:3b5957e61979aa4403e4ef",
  measurementId: "G-BTVFBWHZM9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics only if window is defined (browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
