import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React, { createContext } from 'react';

const Context = createContext({});

function App({ Component, pageProps }: AppProps) {
  const sharedData = {
    profession: '',
    industry: '',
    region: '',
  };

  return (
    <Context.Provider value={sharedData}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default App;
