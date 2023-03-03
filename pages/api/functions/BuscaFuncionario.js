import admin from '../../../lib/firebaseAdmin'

export default async function handler(req, res) { 
    return new Promise ((resolve,reject)=>{
        console.log('Executando a API...')
        let userid = req.body
        try{
            if (req.method === 'POST') {
                admin.firestore()
                    .collection('funcionarios')
                    .doc(userid)
                    .get()
                    .then((doc)=>{
                        if (!doc.exists) {
                            console.log('No such document!');
                          } else {
                            console.log(doc.data());
                            res.status(200).json(doc.data());
                            return resolve
                          }
                    })}
        } catch (e) {
        console.error('Erro ao tentar atualizar os dados!')
        console.log(e)
        res.status(400).end()
        return reject
        }
    })}