import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { collection, getDocs, query, collectionGroup } from "firebase/firestore";
import { db } from "../components/Firebase/firebase";

function DashboardPage ({segurados}) {
  return (
    <ProtectedRoute>
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700">
        Price
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export async function getStaticProps() {
  const q = query(collectionGroup(db,'Users'));
  const querySnapshot = await getDocs(q);
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()
  const segurados = [];
  //const querySnapshot = await getDocs(collection(db,'Users'));
  querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
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