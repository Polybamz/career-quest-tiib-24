
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
  serverTimestamp, // <-- Import Firestore functions
  collection,
  query,
  getDocs,
  where
} from "firebase/firestore";

// id: 1,
//       title: "Senior Software Engineer",
//       company: "TechCorp Inc.",
//       logoUrl: "/placeholder.svg",
//       location: "Lagos, Nigeria",
//       type: "Full-time",
//       description: "Join our dynamic team as a Senior Software Engineer. We're looking for someone with 5+ years experience in React, Node.js, and cloud technologies. You will be responsible for building and maintaining our core platform, ensuring scalability and performance.",
//       postedDate: "2025-08-10T10:00:00Z",
//       applyType: "external",
//       applyLink: "https://techcorp.com/careers/senior-engineer",
//       salary: "$8,000,000 - $12,000,000 Annually",
//       tags: ["React", "Node.js", "AWS", "Senior Level", "Backend"]

interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl:string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  postedDate: string;
  applyType: 'internal' | 'external';
  salary: string;
  tags: string[];
  description: string;
  requirements: string;
  applyLink?: string; // Optional for internal applications
  applyEmail?: string; // Optional for internal applications
  expiryDate: string;
  status: 'active' | 'pending' | 'closed';
  createdAt: any;
  employerId: string;
}
interface Blogs {
  id:string;
  title:string;
  excerpt:string;
  body: string;
  author:string;
  readTime:string;
  catigory:string;
  createdAt: any;
}

// TODO: Replace with your app's Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBR_3rky167nkSfAJGCgMl7i1Sho7F6928",
  authDomain: "yocaco-fb6f3.firebaseapp.com",
  projectId: "yocaco-fb6f3",
  storageBucket: "yocaco-fb6f3.firebasestorage.app",
  messagingSenderId: "787242461681",
  appId: "1:787242461681:web:3010c0a5c9becdbc677c50",
  measurementId: "G-R3YYMJ9F4R"
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
/// get jobs
export const getJobs = async () => {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('status', '==', 'active'));
    const querySnapshot = await getDocs(q);
    const jobsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Job[];
    return jobsData
  } catch (er) {
    throw Error(er)
  }
}
/// get article

export const getAllArticls =()=>{
  try{}catch (er){}
}

/// get coaching
export const getAllCoaching =()=>{
    try{}catch (er){}

}

/// get insights
export const getAllInsight =()=>{
    try{}catch (er){}
}

// Job Seeker Profile functions
export const createJobSeekerProfile = async (uid: string, profileData: any) => {
  try {
    const profileRef = doc(db, 'jobSeekerProfiles', uid);
    await setDoc(profileRef, {
      ...profileData,
      uid,
      createdAt: serverTimestamp(),
      profileComplete: true
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating job seeker profile:', error);
    throw error;
  }
};

export const getJobSeekerProfile = async (uid: string) => {
  try {
    const profileRef = doc(db, 'jobSeekerProfiles', uid);
    const profileDoc = await getDoc(profileRef);
    return profileDoc.exists() ? profileDoc.data() : null;
  } catch (error) {
    console.error('Error fetching job seeker profile:', error);
    throw error;
  }
};

// Analytics functions
export const getJobAnalytics = async (employerId: string) => {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, where('employerId', '==', employerId));
    const querySnapshot = await getDocs(q);
    
    const jobs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Job[];

    // Generate analytics data
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.status === 'active').length;
    const pendingJobs = jobs.filter(job => job.status === 'pending').length;
    const closedJobs = jobs.filter(job => job.status === 'closed').length;

    // Monthly job postings (mock data for demo)
    const monthlyData = [
      { month: 'Jan', jobs: Math.floor(Math.random() * 10) + 1 },
      { month: 'Feb', jobs: Math.floor(Math.random() * 10) + 1 },
      { month: 'Mar', jobs: Math.floor(Math.random() * 10) + 1 },
      { month: 'Apr', jobs: Math.floor(Math.random() * 10) + 1 },
      { month: 'May', jobs: Math.floor(Math.random() * 10) + 1 },
      { month: 'Jun', jobs: totalJobs },
    ];

    // Job type distribution
    const jobTypes = jobs.reduce((acc, job) => {
      acc[job.type] = (acc[job.type] || 0) + 1;
      return acc;
    }, {});

    const typeData = Object.entries(jobTypes).map(([type, count]) => ({
      type: type.replace('-', ' '),
      count,
    }));

    return {
      totalJobs,
      activeJobs,
      pendingJobs,
      closedJobs,
      monthlyData,
      typeData,
      applicationStats: {
        totalApplications: totalJobs * Math.floor(Math.random() * 50) + 10,
        averagePerJob: Math.floor(Math.random() * 25) + 5,
      }
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
};

export default app; 