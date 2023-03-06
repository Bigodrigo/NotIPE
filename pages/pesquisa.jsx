import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../components/context/AuthContext";
import Mensagens from "../components/mensagens";



function PesquisaPage ({segurado}) {
  const [mensagens, setMensagens] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { setUid, setCurrentUser } = useAuth();
    const methods = useForm({ mode: "onBlur" });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
      try {
        setLoading(true)
        const emailval = data.input
        let buscaEmail = await fetch('/api/functions/BuscaEmail', {
          method: 'POST',
          body: emailval
        })
        let resEmail = await buscaEmail.json()
        setUid(resEmail.uid)

        let buscaUser = await fetch('/api/functions/BuscaUser', {
          method: 'POST',
          body: resEmail.uid
        })
        let resUser = await buscaUser.json()
        setCurrentUser({
          emailUser: resUser.email,
          matricula: resUser.matricula,
          token: resUser.token,
        })
        setMensagens(true)
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
                {...register("input", { required: "Input is required" })}
                type="text"
                name="input"
                id="input"
                className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="xxxx@xxxx.com"
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