import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { collection, getDocs, query, collectionGroup } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";

function DashboardPage ({segurados}) {
  return (
    <ProtectedRoute>
      <div className="flex py-2 container mx-auto">
        <div className="text-gray-600 px-12 py-24 mt-24 overflow-y-hidden mx-auto">
          <h2 className="text-2xl font-semibold">Banco de Usuários</h2>
          <ul>
          {segurados.map((segurado) => 
              (<li key={segurado.matricula} className="text-center p-2"><button>{segurado.name}</button></li>)
          )}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export async function getStaticProps() {
  const q = query(collectionGroup(db,'Users'));
  const querySnapshot = await getDocs(q);
  const segurados = [];
  querySnapshot.forEach((doc) => {
      let r = doc.data()
      const userObject = {
        email: r.email,
        matricula: r.matricula,
        name: r.name,
        password:r.password,
    };
      segurados.push(userObject);
  });
  
  return {
    props: {
      segurados,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}

export default DashboardPage;