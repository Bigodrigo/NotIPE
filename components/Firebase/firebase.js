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
// const firebaseConfig = {
//   apiKey: "AIzaSyBgQ4ibN07z3O8KMaLtxhpVTYHV7Xq0lwY",
//   authDomain: "ipesaudeapp.firebaseapp.com",
//   projectId: "ipesaudeapp",
//   storageBucket: "ipesaudeapp.appspot.com",
//   messagingSenderId: "1096335689164",
//   appId: "1:1096335689164:web:e4a768e845b1db731d0969",
//   measurementId: "G-C0LYQRRZ5X"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC1UOo6wNCAIX3o-VLJwhccWsE3BeDJjlk",
  authDomain: "ipesaudeapp-b9b06.firebaseapp.com",
  projectId: "ipesaudeapp-b9b06",
  storageBucket: "ipesaudeapp-b9b06.appspot.com",
  messagingSenderId: "473929146651",
  appId: "1:473929146651:web:8ac3a1aa87a4b71f67b3be"
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