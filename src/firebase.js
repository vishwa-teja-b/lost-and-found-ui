// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPCxwo_FNJFEe878rkaEtS117cazf6Lz4",
  authDomain: "lost-and-found-network-aad90.firebaseapp.com",
  projectId: "lost-and-found-network-aad90",
  storageBucket: "lost-and-found-network-aad90.firebasestorage.app",
  messagingSenderId: "572053881648",
  appId: "1:572053881648:web:c08d9484e44585f1507ef5",
  measurementId: "G-2LLKMCTFT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);