// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { initializeApp } from 'firebase-admin/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getMessaging, getToken, isSupported } from "firebase/messaging";
//import { getMessaging } from "firebase/messaging/sw";
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
// Initialize Firebase Cloud Messaging and get a reference to the service
//Call bt await messaging () everytime a msg is needed!
const messaging = async () => await isSupported() && getMessaging(app);
// messaging.requestPermission()
// .then(function() {
//   console.log('Have permission');
// })
// .catch(function(err) {
//   console.log('Error Occured.');
// })
//getToken(messaging, {vapidKey: "BPCc41hdw1iTCGQAwJWU53g8wBy43nIGnNy4Em31SqFEr149ZNZ9FX_fBBZQiqYnZ-HY5e95-siJTfWFFDaaTRw"});
//aqui ou no mensagens.tsx
// function requestPermission() {
//   console.log('Requesting permission...');
//   Notification.requestPermission().then((permission) => {
//     if (permission === 'granted') {
//       console.log('Notification permission granted.');
//     }})}


export { app, db, auth, messaging }