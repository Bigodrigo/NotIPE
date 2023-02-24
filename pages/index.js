import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import { getSortedPostsData } from '../lib/posts';
import React, {useState, useEffect} from "react"
import { app } from '../components/Firebase/firebase';
import { getMessaging, getToken } from "firebase/messaging";

export default function Home({ allPostsData }) {
  useEffect(() =>{
    // Initialize Firebase
    //const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
})
  return (
    
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p><b>Bem-vindo!!</b> Aqui você pode consultar a situação dos credenciados e enviar mensagens diretamente para o celular deles!</p>
        <Link href="/signup">Criar uma Conta</Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Consultar Situação ou Enviar mensagens?</h2>
        <div>
          <Link href="/pesquisa">Banco de Usuários</Link>
        </div>
      </section>
    </Layout>
  );
}