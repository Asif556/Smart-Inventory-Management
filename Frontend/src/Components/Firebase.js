// Firebase.js
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM6PV2pMY1HUUZ1asW6cA5dDxGRKiho68",
  authDomain: "inventory-management-93042.firebaseapp.com",
  projectId: "inventory-management-93042",
  storageBucket: "inventory-management-93042.firebasestorage.app",
  messagingSenderId: "335925214706",
  appId: "1:335925214706:web:20265f6b42683fa6bfff6b",
  measurementId: "G-ESRD0P0WZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the app instance as default
export default app;
