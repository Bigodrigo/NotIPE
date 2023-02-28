import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
//import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/router";
// import auth from '@react-native-firebase/auth'
// import firestore from '@react-native-firebase/firestore'
import { getDoc, collection, doc, setDoc, Timestamp, set } from "firebase/firestore";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, auth } from "../components/Firebase/firebase";
import { Funcionario, funcionarioConverter, User, userConverter } from "../components/Firebase/converter";

const SignupPage = () => {
  const methods = useForm({ mode: "onBlur" });
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cargo, setCargo] = useState('Opções');
  const [aberto, setAberto] = useState(false);
  const [erro, setErro] = useState('');


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  //const { signUp } = useAuth();
  const router = useRouter();

  const Abertura= ()=>{
    if(aberto == true){
      setAberto(false)
    }else{
      setAberto(true)
    }
  }

  const definiçãoCargo=(C)=>{
    setAberto(false)
    setCargo(C)
  }

  const validacao=()=>{
    if(!email || !password || !nome || cargo == 'Opções'  ){
      setErro('por favor preencha todos os campos')
    }
   
  }





  const onSubmit = async (data) => {
    try {//auth().
      //const usercredentials = createUserWithEmailAndPassword(data.email, data.password).then((usercredentials) => {
      // if (usercredentials) {//firestore().
      //     collection('funcionarios').doc(usercredentials.user.uid).set({
      //       email: data.email,
      //       matricula: data.matricula,
      //       token: 'First Login!',
      //       uid: usercredentials.user.uid,
      //     })
      await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (usercredentials) => {
        const docRef = doc(db, 'funcionarios', usercredentials.user.uid).withConverter(funcionarioConverter)
        await setDoc(docRef, new Funcionario(nome, email, cargo))
      })


    } catch (error) {
      console.log(error.message);
    }
    //}).catch((error) => {console.log(error)});
    router.push("/dashboard");
  };


  return (
    <div className="sign-up-form container  mx-auto w-96 mt-12 border-2  border-gray-400">
      <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">Sign Up</h2>
      <FormProvider {...methods}>
        <form action="" className="w-80 mx-auto pb-12 px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Nome
              </label>
            </div>

            <input
              type="name"
              {...register("name", { required: "Nome is required" })}
              value={nome}
              onChange={e => setNome(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />

          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">

              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Confirm Password
              </label>
            </div>

            <input
              type="password"
              {...register("password_confirm", {
                required: "Verify your password",
              })}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password_confirm && (
              <p className="text-red-400">{errors.password_confirm.message}</p>
            )}
          </div>

          <div class="relative inline-block ml-44 mt-7">
            <div>
              <button type="button" onClick={Abertura} class="inline-flex w-full  justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
               {cargo}
                <svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
              {aberto == true  ? 
              <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
              <div class="py-1" role="none">
                <button  type="button" onClick={e => definiçãoCargo("Financeiro") } class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Fianceiro</button>
                <button  type="button" onClick={e => definiçãoCargo("Comunicação")} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Comunicação</button>
              </div>
            </div> :'' }
            
          </div>





          <div className="flex justify-center pt-8">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">submit</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignupPage;