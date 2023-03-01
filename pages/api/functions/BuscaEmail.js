import admin from '../../../lib/firebaseAdmin'
//import { useAuth } from "../../components/context/AuthContext";

export default async function handler(req, res) {
    console.log('Executando a API...')
    //let email = req.body.email
    try{
        if (req.method === 'POST') {
             await admin.firestore().collection('users')
                .doc('QbS7yWZ86UY5h4PYkW6nExJDVKk2')
                .get().then((user)=>{
                    let teste = JSON.stringify(user)
                    return console.log(teste)
                })  
                //console.log(teste)
        }
        res.status(200).end()
    } catch (e) {
    console.error('Erro ao tentar atualizar os dados!')
    console.log(e)
    res.status(400).end()
    }
}
