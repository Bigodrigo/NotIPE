import admin from '../../../lib/firebaseAdmin'

export default async function handler(req, res) {
    console.log('Executando a API...')
    let userid = req.body
    try{
        if (req.method === 'POST') {
            let snapshot = await admin.firestore()
                .collection('users')
                .doc(userid)
                .collection('Mensagens')
                .get();
                let mensagens = snapshot.docs.map((doc) => {
                    return doc.data();
                  })
                  res.status(200).json(mensagens)
        }
    } catch (e) {
    console.error('Erro ao tentar atualizar os dados!')
    console.log(e)
    res.status(400).end()
    }
}