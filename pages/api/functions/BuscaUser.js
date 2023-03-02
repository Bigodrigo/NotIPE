import admin from '../../../lib/firebaseAdmin'

export default async function handler(req, res) {
    console.log('Executando a API...')
    let userid = req.body
    try{
        if (req.method === 'POST') {
            admin.firestore()
                .collection('users')
                .doc(userid)
                .get()
                .then((doc)=>{
                    if (!doc.exists) {
                        console.log('No such document!');
                      } else {
                        res.status(200).json(doc.data());
                      }
                })}
    } catch (e) {
    console.error('Erro ao tentar atualizar os dados!')
    console.log(e)
    res.status(400).end()
    }
}