
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { AuthContextProvider } from "../components/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </AuthContextProvider>
  );
}

export default MyApp;