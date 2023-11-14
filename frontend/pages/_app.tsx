import React, { createContext } from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

const Context = createContext({});

function App({ Component, pageProps }: AppProps) {
  const sharedData = {
    profession: "",
    industry: "",
    region: "",
  };

  return (
    <>
      <Head>
        <title>JobRoute</title>
      </Head>
      <Context.Provider value={sharedData}>
        <Component {...pageProps} />
      </Context.Provider>
    </>
  );
}

export default App;
