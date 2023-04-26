import * as React from 'react';
import Nav from '@/components/molecules/nav';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <>
    <Nav />
    <Component {...pageProps} />
    </>
  )
}
