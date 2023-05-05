import * as React from 'react'
import Link from 'next/link';
import Icon from './../atoms/icon';
import axios from 'axios';

export default function Nav() {
  const [menuState, setMenuState] = React.useState(false);
  const [accountState, setAccountState] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const getAccount = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    setLoggedIn(accessToken);
  };

  const LogOut = () => {
    sessionStorage.removeItem('accessToken');
  }

  const toggleAccount = () => {
    setAccountState(!accountState);
    setMenuState(false);
  }

  const toggleMenu = () => {
    setAccountState(false);
    setMenuState(!menuState);
  }

  React.useEffect(() => {
    getAccount();
  }, []);
  return (
    <div>
      <div className='u-nav-wrapper'>
        {loggedIn && 
          <div className="u-nav-account">
            <Icon
              className={`u-nav-button ${accountState && 'u-nav-account--open'}`}
              iconName="member"
              width="32"
              height="32"
              onClick={toggleAccount}
            />
            <div className={`u-nav-account__menu ${accountState && 'u-nav-account__menu--open'}`}>
              <Link href="/" onClick={LogOut}>Log out</Link>
            </div>
          </div>
        }
        <button className={`u-nav-button ${menuState && 'u-nav-button--open'}`} onClick={toggleMenu}>
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
                <a href="utils">util page</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}