import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

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



  const logIn = async (email, password) => {
    let userCredencial =  await signInWithEmailAndPassword(auth, email, password)
          const uid = userCredencial.user.uid;
          return uid;
    };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };



  const [{ emailUser, matricula, token }, setCurrentUser] = useState({
    emailUser:'',
    matricula:'',
    token:'',
  });

  const [{ cargo, emailFuncionario, nome }, setCurrentFuncionario] = useState({
    cargo:'',
    emailFuncionario:'',
    nome:'',
  });

  const [mensagem, setMensagem] = useState('Testando no Context!')

  return (
    <AuthContext.Provider value={{ user,  logIn, logOut,  emailUser, matricula, token, uid, setUid, setCurrentUser, mensagem, setMensagem, cargo, emailFuncionario, nome, setCurrentFuncionario }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};