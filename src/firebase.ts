// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-portfolio-c2d51.firebaseapp.com",
  projectId: "my-portfolio-c2d51",
  storageBucket: "my-portfolio-c2d51.appspot.com",
  messagingSenderId: "501573038974",
  appId: "1:501573038974:web:44a7788782d2ff99bef92f"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };