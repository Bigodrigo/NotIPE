import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { FormProvider, useForm } from "react-hook-form";
import ProtectedRoute from "../components/ProtectedRoute";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";

const Mensagens = () => {
  const { email, mat, token, setMensagem } = useAuth();
  const mandaMensagem = async function (message) {
    //const message = 'Testezinho sem o jão!'
    console.log(token)
    setMensagem(message);
    // const payload = {
    //     //token: "fhU2rIxPQuO7IuOzPavYUU:APA91bHA1TY6fEnyrCgE780RbF4UTYAcdGn7UYzl9H_OTDO5lhA8w0MlsRoNUEWw-2LJF1kCbYyzhhV3TjFu0yuk8tnr3wGmphuN2dcTzExTAFm3w0CnAArF4V1WSDsAMJezXSCTMJEq",
    //     token,
    //     notification: {
    //         title: 'Nova Notificação do IPE!',
    //         body: message,
    //     }
    // }
    //o objeto funciona?
    // fetch('/api/tryFirebaseAdmin',{
    //   method: 'PUT',
    //   body: JSON.stringify({
    //     //userReply: detail.input,
    //     //readConfirm: new Date()
    //     payload
    //   }),
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-type': 'application/json'            
    //   }})
    fetch('/api/tryFirebaseAdmin')
      .then((response) => {
          console.log('Resposta enviada para API com sucesso!')})
      .catch((error) => {
          console.error(error)})
      // .then((res) => {
      //       const data = res.json()
      //       console.log('Mensagem Enviada')
      //       console.log(data)
      //   }).catch((e) => {
      //       console.log(e)
      //   })
    }
    interface MensagemType {
      mensagem: string;
    }
      const methods = useForm<MensagemType>({ mode: "onBlur" });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = methods;

    const onSubmit = async (data: MensagemType) => {
      try {
        const docRef = doc(db,'mensagens','wLqiBZRUk1Qwl1F5syhMfEvkUAq2wLqiBZRUk1Qwl1F5syhMfEvkUAq2');
        //console.log()
        await setDoc(docRef,data);
          //let r = docSnap.data()
          //console.log(r)
          mandaMensagem(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    return (
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informações do Segurado</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500"></p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Matricula</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{mat}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{email}</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Último Token</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{token}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Mensagens</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Esperando o FireBase!!</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Enviar nova mensagem:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm"> </span>
                      </div>
                      <input
                        {...register("mensagem", { required: "Mensagem is required" })}
                        type="text"
                        name="mensagem"
                        id="mensagem"
                        className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Digite a mensagem..."
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <button
                          type="submit"
                          className="h-full rounded-md border-transparent bg-transparent py-0 px-4 text-blue-800 sm:text-sm"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </form>
      </FormProvider>
    )
  }

export default Mensagens;