import admin from '../../lib/firebaseAdmin'

export default async function handler(req, res) {
    //const documentSnapshot = await admin.firestore().collection("fcmTokens").doc('123456').get();
    //const token = documentSnapshot.data()[FCM_TOKEN_KEY];
    const message = 'Testezinho sem o jão!'
    const payload = {
        token: "fhU2rIxPQuO7IuOzPavYUU:APA91bHA1TY6fEnyrCgE780RbF4UTYAcdGn7UYzl9H_OTDO5lhA8w0MlsRoNUEWw-2LJF1kCbYyzhhV3TjFu0yuk8tnr3wGmphuN2dcTzExTAFm3w0CnAArF4V1WSDsAMJezXSCTMJEq",
        //token,
        notification: {
            title: 'Confia!',
            body: message,
        }
    }
    const firebase = admin.messaging().send(payload).catch(e=>console.log(e))
    res.status(200)
    res.json({
        mensagem: 'Enviado'    })
    return res
    // admin.messaging().send(payload).then(response => {
    //     console.log('Mandou!!', response);
    // }).catch(error => {
    //     console.log('Error: ', error);
    // })
}