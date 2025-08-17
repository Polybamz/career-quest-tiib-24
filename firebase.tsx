
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp // <-- Import Firestore functions
} from "firebase/firestore";

// TODO: Replace with your app's Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: "AIzaSyAjFPm2FmvOTsD3gZDe-FfXHdOP4H7Fc4s",
  authDomain: "career-companion-968d2.firebaseapp.com",
  projectId: "career-companion-968d2",
  storageBucket: "career-companion-968d2.firebasestorage.app",
  messagingSenderId: "567547845140",
  appId: "1:567547845140:web:397647821eb98ebe416501",
  measurementId: "G-GSK1R40HJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

// --- Reusable Helper Function ---
// This function checks if a user exists in Firestore and creates them if not.
// This is useful for both email registration and social sign-ins.
const addUserToFirestore = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    // Document doesn't exist, so create it.
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName, // Comes from Google or can be passed for email/pass
      email: user.email,
      createdAt: serverTimestamp(), // Records the time the user was created
      savedJobs: [], // A useful parameter for a job board app
      profileComplete: false, // Useful for onboarding flows
    });
  }
};

// --- Authentication Functions ---

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    // 1. Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Create the user document in Firestore with the provided name
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      name, // Use the name from the function parameter
      email: user.email,
      createdAt: serverTimestamp(),
      savedJobs: [],
      profileComplete: false,
    });
    
    return userCredential;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // Re-throw the error to be handled by the UI
  }
};

export const loginWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Initialize the Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    // 1. Sign in with Google popup
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // 2. Add user to Firestore (this will only create them on their first sign-in)
    await addUserToFirestore(user);

    return result;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};

export default app; 