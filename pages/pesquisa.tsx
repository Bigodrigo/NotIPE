import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProtectedRoute from "../components/ProtectedRoute";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";
import { useAuth } from "../components/context/AuthContext";
import Mensagens from "../components/mensagens";
//aproveitar q ja tem context e empurrar o usuário?!?! A matricula da pessoa?!
import { saveMessagingDeviceToken } from "../components/Firebase/messaging"
import admin from 'firebase-admin'

function PesquisaPage ({segurado}) {
  const [mensagens, setMensagens] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { changeMatricula, setCurrentUser } = useAuth();
  //const router = useRouter();
  interface MatriculaType {
    matricula: string;
  }
    const methods = useForm<MatriculaType>({ mode: "onBlur" });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = methods;

    const mandaMensagem = async function () {
      fetch('/api/tryFirebaseAdmin')
          .then((res) => {
              const data = res.json()
              console.log('Mensagem Enviada')
              console.log(data)
          }).catch((e) => {
              console.log(e)
          })
  }

    const onSubmit = async (data: MatriculaType) => {
      try {
        setLoading(true)
        const matricula = await changeMatricula(data)
        //console.log(matricula)
        const docRef = doc(db,'Users',matricula.matricula);
        console.log(matricula.matricula)
        const docSnap = await getDoc(docRef);
          let r = docSnap.data()
          console.log(r)
          setCurrentUser({
            email: r.email,
            name: r.name,
            password:r.password,
            });
          setMensagens(true)
          mandaMensagem();
          saveMessagingDeviceToken(matricula.matricula);   
          // const message = 'Teste com o João!';
          // const payload = {
          //   token: "eVkOSNUeRT6zNO3fxZQzS3:APA91bFhYSdoEeHLHV_eQq2nQcQ7NGrAHJzPIuppbojQ5uDe5JTlsVfrWH9wI_nUsy2RzulZcB2XUa12uufs7PK8dyOVgGL2eVOzZ7MCBGICRqmvsD69wTEhYhWaym3Dctqjeqx_5x9m",
          //   notification : {
          //     title: 'Confia!',
          //     body: message,
          //   }
          // }
          // admin.messaging().send(payload).then(response => {
          //   console.log('Mandou!!')
          // })   
      // return {
      //   props: {
      //     segurado,
      //   },
      //   // Next.js will attempt to re-generate the page:
      //   // - When a request comes in
      //   // - At most once every 10 seconds
      //   revalidate: 10, // In seconds
      // }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    

  return (
    <ProtectedRoute>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex py-2 container mx-auto">
            <label htmlFor="price" className="block text-2xl font-medium text-gray-700 mx-4 py-1">
              Matricula :
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm"> </span>
              </div>
              <input
                {...register("matricula", { required: "Matricula is required" })}
                type="text"
                name="matricula"
                id="matricula"
                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="00.00000000.00.0"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="submit"
                  className="h-full rounded-md border-transparent bg-transparent py-0 px-4 text-blue-800 sm:text-sm"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
          { mensagens ? <Mensagens /> : <p> </p> }
        </form>
      </FormProvider>
    </ProtectedRoute>
  );
};

export default PesquisaPage;