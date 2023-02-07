import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import React, {useState, useEffect} from "react"

export default function Home({ allPostsData }) {
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
          <p>Banco de Usuários</p>
        </div>
      </section>
    </Layout>
  );
}