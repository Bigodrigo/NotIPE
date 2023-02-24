import admin from '../../lib/firebaseAdmin'
//import { useAuth } from "../../components/context/AuthContext";

export default async function handler(req, res) {
    //const documentSnapshot = await admin.firestore().collection("fcmTokens").doc('123456').get();
    //const token = documentSnapshot.data()[FCM_TOKEN_KEY];
    const payload = {
        token: req.body.token,
        notification: {
            title: req.body.title,
            body: req.body.input,
        }
    }
    //const firebase = admin.messaging().send(payload).catch(e=>console.log(e))
    admin.messaging().send(payload).catch(e=>console.log(e))
    res.status(200)
    res.json({ mensagem: 'Enviado' })
    return res
}