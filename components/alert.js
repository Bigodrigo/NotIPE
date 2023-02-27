import React, { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";
import { useAuth } from "./context/AuthContext";
import { formataData } from "../utils/scripts"

const Alert = ({show,setShow}) => {

    const { mensagem, token, uid } = useAuth();

    const mandaMensagem = async function () {
        //const envio = formataData(new Date().toLocaleString(),'## ## ####, ##:##:##')
        //const envio = formataData(new Date().toLocaleString())
        try {
            console.log(uid)
            const mensagemObject ={
                enviadoEm: new Date().toLocaleString(),
                pergunta: mensagem.input,
                recebidoEm: '',
                resposta: '',
            }   
            const docRef = doc(db,'users', uid, 'Mensagens', formataData(mensagemObject.enviadoEm));
            console.log(mensagemObject)
            await setDoc(docRef, mensagemObject);
            let request = new Request('/api/tryFirebaseAdmin', {
                method: 'POST',
                body: JSON.stringify({
                    token: token,
                    title: "Notificação Nova!",
                    input: mensagem.input,
                    userid: uid,
                    messageid: 'conversa1'
                }),
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8'
                })
            }
            );
            fetch(request)
                .then((response) => {
                    console.log('Resposta enviada para API com sucesso!', response)
                })
                .catch((error) => {
                    console.log('Error sending message:', error);
                });
        } catch (error) {
            console.log(error.message);
        }
    };
    return (

        <div id="alert-additional-content-1" class="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
            <div class="flex items-center">
                <svg aria-hidden="true" class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <h3 class="text-lg font-medium">Por Favor, confirme se a mensagem e o destinatário estão corretos!</h3>
            </div>
            <div class="mt-2 mb-4 text-sm">
                {mensagem.input}
            </div>
            <div class="flex">
                <button type="button" class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => mandaMensagem()}
                >
                    Enviar
                </button>
                <button type="button" class="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" data-dismiss-target="#alert-additional-content-1" aria-label="Close"
                    onClick={() => setShow(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default Alert;