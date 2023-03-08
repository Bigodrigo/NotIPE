import admin from '../../../lib/firebaseAdmin'
//import { useAuth } from "../../components/context/AuthContext";

export default async function handler(req, res) {
    //const documentSnapshot = await admin.firestore().collection("fcmTokens").doc('123456').get();
    //const token = documentSnapshot.data()[FCM_TOKEN_KEY];
    const token = req.body.token;
    const payload = {
        data: {
            notifee: JSON.stringify({
                title: req.body.title,
                body: req.body.input,
                android: {
                    channelId: 'default',
                    vibrationPattern: [300, 500],
                    smallIcon: 'icon',
                    actions: [
                        {
                            title: 'Responder',
                            pressAction: {
                                id: 'reply',
                                launchActivity: 'default',
                            },
                            input: true,
                        }
                    ]
                },
                data: {
                    userid: req.body.userid,
                    messageid: req.body.messageid,
                }
            })
        }
    }
    const options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24
    }

    //const firebase = admin.messaging().send(payload).catch(e=>console.log(e))
    //admin.messaging().sendToDevice()
    //send(payload).catch(e=>console.log(e))
    admin.messaging().sendToDevice(token, payload, options)
    res.status(200)
    res.json({ mensagem: 'Enviado' })
    return res
}