import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "lucid-dream-site.firebaseapp.com",
    projectId: "lucid-dream-site",
    storageBucket: "lucid-dream-site.appspot.com",
    messagingSenderId: "794365686972",
    appId: "1:794365686972:web:a594b36df15621d5bc4cb9",
    measurementId: "G-49NB19LTQJ"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app)