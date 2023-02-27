import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { FormProvider, useForm } from "react-hook-form";
import ProtectedRoute from "./ProtectedRoute";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import Alert from "./alert"

const Mensagens = () => {
  const [show, setShow] = useState(false)
  const { email, matricula, token, setMensagem } = useAuth();

  const salvaMensagem = async function (data) {
    setMensagem(data);
    }
      const methods = useForm({ mode: "onBlur" });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = methods;

    const onSubmit = async (data) => {
      try {
        // const docRef = doc(db,'mensagens','wLqiBZRUk1Qwl1F5syhMfEvkUAq2wLqiBZRUk1Qwl1F5syhMfEvkUAq2');
        // //console.log()
        // await setDoc(docRef,data);
          //let r = docSnap.data()
          //console.log(r)
          salvaMensagem(data);
          setShow(true)
      } catch (error) {
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
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{matricula}</dd>
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
                        {...register("input", { required: "Mensagem is required" })}
                        type="text"
                        name="input"
                        id="input"
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
        { show ? <Alert show={show} setShow={setShow} /> : <p> </p> }
      </FormProvider>
    )
  }

export default Mensagens;