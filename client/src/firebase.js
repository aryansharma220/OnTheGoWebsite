// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "onthegoauth.firebaseapp.com",
  projectId: "onthegoauth",
  storageBucket: "onthegoauth.appspot.com",
  messagingSenderId: "373711205813",
  appId: "1:373711205813:web:511d290241ce7c3be8d5fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);