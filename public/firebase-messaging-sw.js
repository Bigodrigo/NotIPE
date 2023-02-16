importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyCVu09He75tJEA3PP8dCBwU0LYZYNFh0TM",
    authDomain: "nextnotipe.firebaseapp.com",
    projectId: "nextnotipe",
    storageBucket: "nextnotipe.appspot.com",
    messagingSenderId: "871624826918",
    appId: "1:871624826918:web:5dee10aec39711057f46e7"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
    console.log('Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationBody = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationBody);
})