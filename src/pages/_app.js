import * as React from 'react';
import Link from 'next/link';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <>
    <div>
      <div className='u-nav-wrapper'>
        <button className={`u-nav-button ${menuState && 'u-nav-button--open'}`} onClick={() => setMenuState(!menuState)}>
          <span className="u-nav-button__line"></span>
          <span className="u-nav-button__line"></span>
          <span className="u-nav-button__line"></span>
        </button>
        <div className={`u-nav-menu ${menuState && 'u-nav-menu--open'}`}>
          <nav>
            <ul className="u-nav-menu__list">
              <li className="u-nav-menu__list__item">
                <Link href="/" onClick={() => setMenuState(!menuState)}>Home</Link>
              </li>
              <li className="u-nav-menu__list__item">
                <Link href="/privacy-policy" onClick={() => setMenuState(!menuState)}>Privacy Policy</Link>
              </li>
              <li className="u-nav-menu__list__item">
                <a href="#">util page</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <Component {...pageProps} />
    </>
  )
}
