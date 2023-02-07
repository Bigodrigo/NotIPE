// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVu09He75tJEA3PP8dCBwU0LYZYNFh0TM",
  authDomain: "nextnotipe.firebaseapp.com",
  projectId: "nextnotipe",
  storageBucket: "nextnotipe.appspot.com",
  messagingSenderId: "871624826918",
  appId: "1:871624826918:web:5dee10aec39711057f46e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { app, db, auth }