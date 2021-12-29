// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDEehcsScVjwGjlNPMBd5eiM8vQzmvKiPI",
    authDomain: "red-literaria.firebaseapp.com",
    projectId: "red-literaria",
    storageBucket: "gs://red-literaria.appspot.com",
    messagingSenderId: "515295778880",
    appId: "1:515295778880:web:d5901694bb4e228f8c27a5",
    measurementId: "G-B5VCSY50W0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app}