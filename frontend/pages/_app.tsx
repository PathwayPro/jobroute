import React, { createContext } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { useRouter } from "next/router";

const Context = createContext({});

function App({ Component, pageProps }: AppProps) {
  const sharedData = {
    profession: "",
    industry: "",
    region: "",
  };
  const router = useRouter();

  return (
    <>
      <Head>
        <title>JobRoute</title>
      </Head>
      <Context.Provider value={sharedData}>
        <Component key={router.asPath} {...pageProps} />
      </Context.Provider>
    </>
  );
}

export default App;
