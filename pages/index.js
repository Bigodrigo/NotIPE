import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import { getSortedPostsData } from '../lib/posts';
import React, { useState, useEffect } from "react"
import { app } from '../components/Firebase/firebase';
import { getMessaging, getToken } from "firebase/messaging";
import { useAuth } from "../components/context/AuthContext";
import { useRouter } from 'next/router';

export default function Home({ allPostsData }) {
  const { cargo } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const messaging = getMessaging(app);
  })

  const validacao = () => {
    if (cargo == 'Financeiro') {
      router.push("/pesquisa");
    }else{
      router.push('/login')
    }
  }
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
          <button className='text-blue-500 font-normal  ' onClick={validacao}>Banco de Usuários</button>
        </div>
      </section>
    </Layout>
  );
}