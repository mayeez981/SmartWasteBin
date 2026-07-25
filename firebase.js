// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm2P3KEE3kIXtRhpQKVZwNZaeIfdJV8vY",
  authDomain: "smart-waste-bin-1e6e3.firebaseapp.com",
  projectId: "smart-waste-bin-1e6e3",
  storageBucket: "smart-waste-bin-1e6e3.firebasestorage.app",
  messagingSenderId: "717682603125",
  appId: "1:717682603125:web:b4b8678777f66eda80f43c",
  measurementId: "G-WWPP18KG7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };