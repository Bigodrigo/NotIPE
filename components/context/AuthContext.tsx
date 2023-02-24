import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { getDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { User, userConverter } from "../Firebase/converter";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [matricula, setMatricula] = useState<string>(null)
  const [loading, setLoading] = useState<boolean>(true);

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

  const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredencial) => {
      let user = userCredencial.user;
      const uid = user.uid;
      console.log(uid)
      const docRef = doc(db,'user',uid).withConverter(userConverter)
      await setDoc(docRef, new User(email, matricula))
    })
    return
  };

  const logIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then(async(userCredential) => {
      let user = userCredential.user;
          const uid = user.uid;
          const docRef = doc(db,uid,'Infos').withConverter(userConverter)
          const testeSnap = await getDoc(docRef);
          //console.log(uid, 'Precisa ter mudado!!')
          if (testeSnap.exists()) {
            const user = testeSnap.data();
            //console.log(user.toString());
            // setCurrentUser({
            // email: user.email,
            // name: user.name,
            // password: user.password,
            // uid: user.uid,
            // });
          }
        })
    return;
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  const changeMatricula = async (matricula: string) => {
    setMatricula(matricula)
    return matricula;
  };

  const [{ email, mat, token, uid }, setCurrentUser] = useState({
    email:'',
    mat:'',
    token:'',
    uid:'',
    //uidTeste: KLz4kQwtPhQVo34VdbmUFWAUMMR2
    //uidJair: wLqiBZRUk1Qwl1F5syhMfEvkUAq2
    //tokenTeste: dExt3G1BRBq0ORj3lHM1hQ:APA91bG62SoqpBtI430OXp5blmNnfcQnRNr6b203yl0lnL99ks20wQcq_ZnmLXRXQgwRS5anMs7gxmbWEWEztkfEDQO8IqhhQdDR0EnyuY1WmjTDF6NuAWPEj782uVzkRlv0z6yo1oN9
    //tokenJair: "fhU2rIxPQuO7IuOzPavYUU:APA91bHA1TY6fEnyrCgE780RbF4UTYAcdGn7UYzl9H_OTDO5lhA8w0MlsRoNUEWw-2LJF1kCbYyzhhV3TjFu0yuk8tnr3wGmphuN2dcTzExTAFm3w0CnAArF4V1WSDsAMJezXSCTMJEq"
  });

  const [mensagem, setMensagem] = useState<string>('Testando no Context!')

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut, changeMatricula, email, mat, token, uid, setCurrentUser, mensagem, setMensagem }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};