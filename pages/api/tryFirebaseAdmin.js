import admin from '../../lib/firebaseAdmin'
import { useAuth } from "../../components/context/AuthContext";

export default async function handler(req, res) {
    //const documentSnapshot = await admin.firestore().collection("fcmTokens").doc('123456').get();
    //const token = documentSnapshot.data()[FCM_TOKEN_KEY];
    // const message = 'Testezinho sem o jão!'
    //const { mensagem, token } = useAuth();
    //const { token } = useAuth();
    //console.log(token);
    //console.log(mensagem);
    const payload = {
        //token: {token},
        token:'fhU2rIxPQuO7IuOzPavYUU:APA91bHA1TY6fEnyrCgE780RbF4UTYAcdGn7UYzl9H_OTDO5lhA8w0MlsRoNUEWw-2LJF1kCbYyzhhV3TjFu0yuk8tnr3wGmphuN2dcTzExTAFm3w0CnAArF4V1WSDsAMJezXSCTMJEq',
        notification: {
            title: 'Confia!',
            body: 'mensagem',
        }
    }
    //const firebase = admin.messaging().send(payload).catch(e=>console.log(e))
    admin.messaging().send(payload).catch(e=>console.log(e))
    res.status(200)
    res.json({ mensagem: 'Enviado' })
    // try {
    //     if (req.method === 'PUT') {
    //         // await db.collection('users').doc(userid as string).update({
    //         //     ...req.body,
    //         //     updated: new Date()
    //         // })
    //         const payload = {
    //             //token: "fhU2rIxPQuO7IuOzPavYUU:APA91bHA1TY6fEnyrCgE780RbF4UTYAcdGn7UYzl9H_OTDO5lhA8w0MlsRoNUEWw-2LJF1kCbYyzhhV3TjFu0yuk8tnr3wGmphuN2dcTzExTAFm3w0CnAArF4V1WSDsAMJezXSCTMJEq",
    //             token: req.body.payload.token,
    //             notification: {
    //                 title: 'Confia!',
    //                 body: req.body.payload.notification.body,
    //             }
    //         }
    //         admin.messaging().send(payload).catch(e=>console.log(e))
    //     }
    //     res.status(200).end()
    //     console.log('Banco de dados atualizado com sucesso!')
    // } catch (e) {
    //     console.log(e)
    //     res.status(400).end()
    // }
    return res
    // admin.messaging().send(payload).then(response => {
    //     console.log('Mandou!!', response);
    // }).catch(error => {
    //     console.log('Error: ', error);
    // })
}