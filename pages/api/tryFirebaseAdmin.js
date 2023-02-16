import admin from '../../lib/firebaseAdmin'

export default async function handler(req, res) {
    //const documentSnapshot = await admin.firestore().collection("fcmTokens").doc('123456').get();
    //const token = documentSnapshot.data()[FCM_TOKEN_KEY];
    const message = 'Testezinho sem o jão!'
    const payload = {
        token: "fsMJvirtSueLF-_1DP-97I:APA91bHKZq_3xF6iNbqfkCZp6mumtIeQYwI9-byKJWiopdvP0No9PuUWuFzwotW4EamUxwFgM-l28rBEcJAjoaZFxJsg-uk4upGCackPvP_rkwbs_zTHYmx-1t1LoVsZSFmTLB6qL1nr",
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