import * as React from 'react';
import Nav from '@/components/Organism/nav';
import '@/styles/globals.css';
import Footer from '@/components/layout/footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
