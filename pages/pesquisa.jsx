import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProtectedRoute from "../components/ProtectedRoute";
import { doc, getDoc,collection,query ,where,getDocs  } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";
import { useAuth } from "../components/context/AuthContext";
import Mensagens from "../components/mensagens";
//aproveitar q ja tem context e empurrar o usuário?!?! A matricula da pessoa?!
import { saveMessagingDeviceToken } from "../components/Firebase/messaging"


function PesquisaPage ({segurado}) {
  const [mensagens, setMensagens] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { changeMatricula, setCurrentUser } = useAuth();
  //const router = useRouter();
    const methods = useForm({ mode: "onBlur" });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
      try {
        setLoading(true)
        const emailval = await changeMatricula(data)
      // console.log(data)
       // const docRef = doc(db,'users',email.matricula);
     //  console.log(email)
       const docRef = query(collection(db,'users'), where("email", "==", emailval.matricula));
      //  console.log(docRef)
        const docSnap = await getDocs(docRef);
        // console.log(docSnap.query);
        
      let t = docSnap.forEach((doc)=>{
         // console.log(doc.id, " => ", doc.data() )
          console.log(doc.id)
          setCurrentUser({
            email: doc.data().email,
            mat:doc.data().matricula,
            token:doc.data().token,
            uid: doc.id,
          })
        });
        //   let r = docSnap.data()
        //  // console.log(r)
        //   setCurrentUser({
        //     email: r.email,
        //     mat: r.mat,
        //     token:r.token,
        //     });
          setMensagens(true)
      // return {
      //   props: {
      //     segurado,
      //   },
      //   // Next.js will attempt to re-generate the page:
      //   // - When a request comes in
      //   // - At most once every 10 seconds
      //   revalidate: 10, // In seconds
      // }
      } catch (error) {
        console.log(error.message);
      }
    };
    

  return (
    <ProtectedRoute>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex py-2 container mx-auto">
            <label htmlFor="price" className="block text-2xl font-medium text-gray-700 mx-4 py-1">
              Email :
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
        </form>
      </FormProvider>
      { mensagens ? <Mensagens /> : <p> </p> }
    </ProtectedRoute>
  );
};

export default PesquisaPage;