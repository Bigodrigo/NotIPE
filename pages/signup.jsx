import React from "react";
import { FormProvider, useForm } from "react-hook-form";
//import { useAuth } from "../components/context/AuthContext";
import { useRouter } from "next/router";
// import auth from '@react-native-firebase/auth'
// import firestore from '@react-native-firebase/firestore'
import { getDoc, collection, doc, setDoc, Timestamp, set } from "firebase/firestore";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { db, auth } from "../components/Firebase/firebase";
import { User, userConverter } from "../components/Firebase/converter";

const SignupPage = () => {
  const methods = useForm({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  //const { signUp } = useAuth();
  const router = useRouter();

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
      await createUserWithEmailAndPassword(auth,data.email, data.password).then(async (usercredentials)=>{
        const docRef = doc(db,'funcionarios',usercredentials.user.uid).withConverter(userConverter)
        await setDoc(docRef, new User(data.email, data.matricula, 'First Login!'))
      })
          
      
        } catch (error) {
          console.log(error.message);
        }
        //}).catch((error) => {console.log(error)});
      router.push("/dashboard");
  };


  return (
    <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
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
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
          </div>
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Matricula
              </label>
            </div>

            <input
              type="matricula"
              {...register("matricula", { required: "Matricula is required" })}
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
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password_confirm && (
              <p className="text-red-400">{errors.password_confirm.message}</p>
            )}
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