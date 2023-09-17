import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvp5u04d-TrM2AXbCIVJZPO52dEQlPWZw",
  authDomain: "hyphen-app-26204.firebaseapp.com",
  projectId: "hyphen-app-26204",
  storageBucket: "hyphen-app-26204.appspot.com",
  messagingSenderId: "475322940412",
  appId: "1:475322940412:web:5cc63e8d9ddfb9365dd079",
  measurementId: "G-JYJHTL8JB0"
};

// Initialize Firebase
let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}
const provider = new EmailAuthProvider();
const db = getFirestore();
const timestamp = serverTimestamp();

export { app, auth, provider, db, timestamp };