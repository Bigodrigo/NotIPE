
// useEffect(() =>{
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const messaging = getMessaging(app);
// })
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