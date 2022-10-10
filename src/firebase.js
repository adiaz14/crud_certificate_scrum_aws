// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR6hzWZ46CtZ-B2L7NUxNW8csKdHHs8d0",
  authDomain: "crud-certificate.firebaseapp.com",
  projectId: "crud-certificate",
  storageBucket: "crud-certificate.appspot.com",
  messagingSenderId: "767392070939",
  appId: "1:767392070939:web:149e67afab59d13042e7be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
