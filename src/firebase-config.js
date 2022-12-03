// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqXt9c22JRIc480AKUPMI6i_mLUPPLeR0",
  authDomain: "film-watch-list-22b48.firebaseapp.com",
  projectId: "film-watch-list-22b48",
  storageBucket: "film-watch-list-22b48.appspot.com",
  messagingSenderId: "270388652477",
  appId: "1:270388652477:web:7b9b707fd726604dddcad4",
  measurementId: "G-3CZN9L30RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
