//nesse momento parece ser inutil, talvez seja necessário somente nos projetos que vão receber notificações! No nosso caso apenas mandamos!!
import React, { useEffect } from "react";
import { app, messaging, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useAuth } from "../context/AuthContext";

const VAPID_KEY = "BPCc41hdw1iTCGQAwJWU53g8wBy43nIGnNy4Em31SqFEr149ZNZ9FX_fBBZQiqYnZ-HY5e95-siJTfWFFDaaTRw"
const FCM_TOKEN_COLLECTION = "fcmTokens";

export async function requestNotificationsPermissions(matricula) {
    console.log('Requesting notifications permissions...');
    //const { matricula } = useAuth();
    console.log(matricula, 'dentro do save!')
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        await saveMessagingDeviceToken(matricula);
    } else {
        console.log('Unable to get permission to notify.');
    }
}

export async function saveMessagingDeviceToken(matricula) {
    // useEffect(() =>{
    //     // Initialize Firebase
    //     //const app = initializeApp(firebaseConfig);
    //     const messaging = getMessaging(app);
    //     const { matricula } = useAuth();
    // },[])
    //const docRef = doc(db,'Users',matricula.matricula);
    //const { matricula } = useAuth();
    const msg = await messaging();
    const fcmToken = await getToken(msg, { vapidKey : VAPID_KEY});
    console.log ('fcmToken: ', fcmToken);
    if (fcmToken) {
        console.log('Got FCM device token: ', fcmToken);
        console.log(matricula, 'dentro do save!')
        //Save device token to Firestore
        const tokenRef = doc(db, FCM_TOKEN_COLLECTION, matricula);
        await setDoc(tokenRef, { fcmToken }); //overwrites

        onMessage(msg, (message) => {
            console.log(
                'New notification!',
                message.notification
            );
            new Notification(message.notification.title, { body: message.notification.body });
        })
    } else {
        //Need perm
        requestNotificationsPermissions(matricula);
    }
}
// // These registration tokens come from the client FCM SDKs.
// const registrationTokens = [
//     'cjHPjzSZQgGF_GFjzsm8MV:APA91bFlBOaEn9RVyJqCJtAa-qEd9c88W1zcaffHxVVQpHoRaFtkWryPqRHa2BwsOilatx5g7rDfN_8feErtrSbqcbyeFzPqpznt7jLDFjvhQSc6BWHpweutsU_MZCSkkg9ddMIK_-Io',
//   ];
  
//   // Subscribe the devices corresponding to the registration tokens to the
//   // topic.
//   getMessaging().subscribeToTopic(registrationTokens, topic)
//     .then((response) => {
//       // See the MessagingTopicManagementResponse reference documentation
//       // for the contents of response.
//       console.log('Successfully subscribed to topic:', response);
//     })
//     .catch((error) => {
//       console.log('Error subscribing to topic:', error);
//     });

// import { getMessaging, onMessage } from "firebase/messaging";    
// const messaging = getMessaging();
// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });