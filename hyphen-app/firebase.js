
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);