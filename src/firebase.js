import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVcomcSG9hCH8frHYEctEqZgHoDOuc_Bk",
  authDomain: "msi-calendar-login.firebaseapp.com",
  projectId: "msi-calendar-login",
  storageBucket: "msi-calendar-login.appspot.com",
  messagingSenderId: "909692978574",
  appId: "1:909692978574:web:32ee1d98d2abb3539150df",
  measurementId: "G-RCCY6GV7V9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const provider = new GoogleAuthProvider();
export default app;
