// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const serviceAccount = require("./firebaseConfig.json");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: serviceAccount.apiKey,
  authDomain: serviceAccount.authDomain,
  projectId: serviceAccount.projectId,
  storageBucket: serviceAccount.storageBucket,
  messagingSenderId: serviceAccount.messagingSenderId,
  appId: serviceAccount.appId,
  measurementId: serviceAccount.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export function to initialize Firebase
export const getFirebaseApp = () => {
  return app;
};
