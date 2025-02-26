import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDClEY51DpIdbKshNTrlc8fKswEr5nHTeE",
    authDomain: "cloudx-2cd72.firebaseapp.com",
    projectId: "cloudx-2cd72",
    storageBucket: "cloudx-2cd72.firebasestorage.app",
    messagingSenderId: "324111287600",
    appId: "1:324111287600:web:7b6994283ae8fc8b8d74f5",
    measurementId: "G-43WTFLRV0Q"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
