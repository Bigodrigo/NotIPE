import React, { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUid, setCurrentFuncionario } = useAuth();
  const { logIn } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const teste = await logIn(email, password);
      console.log(teste)
      // router.push("/dashboard");
      //recebe uid?!
      setUid(teste)
      let buscaFuncionario = await fetch('/api/functions/BuscaFuncionario', {
        method: 'POST',
        body: teste,
      })
      let resFuncionario = await buscaFuncionario.json()
      setCurrentFuncionario({
        cargo: resFuncionario.cargo,
        emailFuncionario: resFuncionario.email,
        nome: resFuncionario.nome,
      })
      if (resFuncionario.cargo == 'Financeiro') {
        router.push("/");  
      }
      else {
        router.push("/dashboard");  
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">Log In</h2>
        <form action="" className="w-80 mx-auto pb-12 px-4">
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {/* {errors.email && <p className="text-red-400">{errors.email.message}</p>} */}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Password
              </label>
            </div>

            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {/* {error.password && <p className="text-red-400">{errors.password.message}</p>} */}
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={()=> onSubmit()}
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">Enviar</p>
            </button>
          </div>
        </form>
    </div>
  );
};

export default LoginPage;