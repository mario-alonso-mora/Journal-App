// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {getFirestore} from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaM5SNbdckV59q5NbyPtIuOOO6hKMd2cQ",
  authDomain: "journal-app-react-fireba-6cbbc.firebaseapp.com",
  projectId: "journal-app-react-fireba-6cbbc",
  storageBucket: "journal-app-react-fireba-6cbbc.appspot.com",
  messagingSenderId: "667684905775",
  appId: "1:667684905775:web:29f7861597f023d5c3b7da"
};

// Initialize Firebase
 export const FireBaseApp = initializeApp(firebaseConfig);

 export const FireBaseAuth = getAuth(FireBaseApp);

 export const FireBaseDB = getFirestore(FireBaseApp);
 
 