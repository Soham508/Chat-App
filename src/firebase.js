// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjMWNFLu13NGn1GOjlbeAzR2CPQ-Q71_E",
  authDomain: "chatapp-b9551.firebaseapp.com",
  projectId: "chatapp-b9551",
  storageBucket: "chatapp-b9551.appspot.com",
  messagingSenderId: "70429608456",
  appId: "1:70429608456:web:9919f0614f6edad4371fbd",
  measurementId: "G-63H4PS6W4G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();


