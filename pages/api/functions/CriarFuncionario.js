// import { firestore } from 'firebase-admin'
// import { UserRecord } from 'firebase-admin/lib/auth/user-record'
import admin from '../../../lib/firebaseAdmin'
export default async function handler(req, res) {

    console.log('Executando API Cadastro...')
    let email = req.body.email
    let senha = req.body.senha
    let nome = req.body.nome
    let cargo = req.body.cargo
    try {
        if (req.method === 'POST') {
            let snapshot =
                await admin.auth()
                    .createUser({
                        email: email,
                        emailVerified: true,
                        password: senha

                    })
                    .then((UserRecord) => {
                        const data = {
                            nome: nome,
                            email: email,
                            cargo: cargo
                        }
                        admin.firestore()
                            .collection('funcionarios')
                            .doc(UserRecord.uid)
                            .set(data)
                            .then(() => {
                                res.status(200).json('teste')
                            })
                    })

        }
    } catch (e) {
        res.status(400).json(e.code)
        console.log("deu ruim ", e.code)
    }

}