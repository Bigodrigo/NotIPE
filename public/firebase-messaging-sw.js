importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyBgQ4ibN07z3O8KMaLtxhpVTYHV7Xq0lwY",
    authDomain: "ipesaudeapp.firebaseapp.com",
    projectId: "ipesaudeapp",
    storageBucket: "ipesaudeapp.appspot.com",
    messagingSenderId: "1096335689164",
    appId: "1:1096335689164:web:e4a768e845b1db731d0969",
    measurementId: "G-C0LYQRRZ5X"
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