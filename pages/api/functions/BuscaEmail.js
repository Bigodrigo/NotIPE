import { firestore } from 'firebase-admin'
import admin from '../../../lib/firebaseAdmin'
//import { useAuth } from "../../components/context/AuthContext";

export default async function handler(req, res) {
    console.log('Executando a API...')
    let email = req.body
    try{
        if (req.method === 'POST') {
            let snapshot =
             await admin.firestore()
                .collection('users')
                .where('email','==',email)
                .get();
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    res.status(200).json(doc.data())
                    //res.end(JSON.stringify(doc.data()));
                  })

        }

     
    } catch (e) {
    console.error('Erro ao tentar atualizar os dados!')
    console.log(e)
    res.status(400).end()
    }
}
