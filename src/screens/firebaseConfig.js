// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_-VTPNaieZwibo5z1MsKcih_7scaXU6Q",
  authDomain: "inovatech-db.firebaseapp.com",
  projectId: "inovatech-db",
  storageBucket: "inovatech-db.firebasestorage.app",
  messagingSenderId: "1078092660139",
  appId: "1:1078092660139:web:a66374a7c5bcf727fb26ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};