import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { getDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { User, userConverter } from "../Firebase/converter";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({ email: null, uid: null });
  const [uid, setUid] = useState(null)
  const [pesquisa, setPesquisa] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  // const signUp = (email, password) => {
  //   //pode ter problema?
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then(async(userCredencial) => {
  //     let user = userCredencial.user;
  //     const uid = user.uid;
  //     console.log(uid)
  //     // const docRef = doc(db,'users',uid).withConverter(userConverter)
  //     // await setDoc(docRef, new User(email))
  //   })
  //   return uid
  // };

  const logIn = async (email, password) => {
    let userCredencial =  await signInWithEmailAndPassword(auth, email, password)
          const uid = userCredencial.user.uid;
          return uid;
    };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  // const changePesquisa = async (input) => {
  //   setPesquisa(input)
  //   return pesquisa;
  // };

  const [{ emailUser, matricula, token }, setCurrentUser] = useState({
    emailUser:'',
    matricula:'',
    token:'',
    //uid:'',
    //uidTeste: KLz4kQwtPhQVo34VdbmUFWAUMMR2
    //uidJair: wLqiBZRUk1Qwl1F5syhMfEvkUAq2
    //tokenTeste: dExt3G1BRBq0ORj3lHM1hQ:APA91bG62SoqpBtI430OXp5blmNnfcQnRNr6b203yl0lnL99ks20wQcq_ZnmLXRXQgwRS5anMs7gxmbWEWEztkfEDQO8IqhhQdDR0EnyuY1WmjTDF6NuAWPEj782uVzkRlv0z6yo1oN9
    //tokenJair: "fhU2rIxPQuO7IuOzPavYUU:APA91bHA1TY6fEnyrCgE780RbF4UTYAcdGn7UYzl9H_OTDO5lhA8w0MlsRoNUEWw-2LJF1kCbYyzhhV3TjFu0yuk8tnr3wGmphuN2dcTzExTAFm3w0CnAArF4V1WSDsAMJezXSCTMJEq"
  });

  const [{ cargo, emailFuncionario, nome }, setCurrentFuncionario] = useState({
    cargo:'',
    emailFuncionario:'',
    nome:'',
    //uid:'',
    //uidTeste: KLz4kQwtPhQVo34VdbmUFWAUMMR2
    //uidJair: wLqiBZRUk1Qwl1F5syhMfEvkUAq2
    //tokenTeste: dExt3G1BRBq0ORj3lHM1hQ:APA91bG62SoqpBtI430OXp5blmNnfcQnRNr6b203yl0lnL99ks20wQcq_ZnmLXRXQgwRS5anMs7gxmbWEWEztkfEDQO8IqhhQdDR0EnyuY1WmjTDF6NuAWPEj782uVzkRlv0z6yo1oN9
    //tokenJair: "fhU2rIxPQuO7IuOzPavYUU:APA91bHA1TY6fEnyrCgE780RbF4UTYAcdGn7UYzl9H_OTDO5lhA8w0MlsRoNUEWw-2LJF1kCbYyzhhV3TjFu0yuk8tnr3wGmphuN2dcTzExTAFm3w0CnAArF4V1WSDsAMJezXSCTMJEq"
  });

  const [mensagem, setMensagem] = useState('Testando no Context!')

  return (
    <AuthContext.Provider value={{ user,  logIn, logOut,  emailUser, matricula, token, uid, setUid, setCurrentUser, mensagem, setMensagem, cargo, emailFuncionario, nome, setCurrentFuncionario }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};