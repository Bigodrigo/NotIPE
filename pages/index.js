import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
//import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';

//Adicionando FB
//import { collection, getDocs } from "firebase/firestore";
import React, {useState, useEffect} from "react"
//import { db } from '../components/Firebase/firebase';
//import { User, userConverter } from '../components/Firebase/converter';

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }) {

  
  //const [posts, setPosts] = useState([]);
  //const posts = [];
  
  
  // useEffect( () => { 
  //   async function fetchData() {
  //     try {
  //       const querySnapshot = await getDocs(collection(db,"User"));
  //       querySnapshot.forEach((doc) => {
  //         //setPosts(posts.push(doc.data()));
  //         console.log(doc.id, " => ", doc.data());
  //         posts.push(doc.data());
  //         console.log(posts);
  //         //posts.push(key=doc.id,)??
  //       });        
  //           } catch (err) {
  //               console.log(err);
  //           }
  //       }
  //       fetchData();
  //   }, []);

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
          {/* {posts.forEach((i)=>console.log(posts[i]))} */}
          {/* {posts.map((item,i) => (
              <p>{item.email}</p>
          ))} */}
        </div>
        {/* <ul className={utilStyles.list}>
          {posts.map((key,value) => (
            <li className={utilStyles.listItem} >
              {posts.key}
            </li>
          ))}
        </ul> */}
      </section>
    </Layout>
  );
}