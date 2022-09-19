// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh_ADjW7zLHnZ_n26j9m3MMRTWdp0wPQc",
  authDomain: "giving-coupons.firebaseapp.com",
  projectId: "giving-coupons",
  storageBucket: "giving-coupons.appspot.com",
  messagingSenderId: "908736405455",
  appId: "1:908736405455:web:741ae82cb6205acfddbcba",
  measurementId: "G-E0010RXQ9K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export function to initialize Firebase
export const getFirebaseApp = () => {
  return app;
};
