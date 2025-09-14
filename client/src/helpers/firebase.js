// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "mern-blog-8f696.firebaseapp.com",
  projectId: "mern-blog-8f696",
  storageBucket: "mern-blog-8f696.firebasestorage.app",
  messagingSenderId: "623174284787",
  appId: "1:623174284787:web:16f87ea412f7dbdc9ece86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}