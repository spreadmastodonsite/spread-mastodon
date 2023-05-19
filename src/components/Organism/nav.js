import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from '../atoms/icon';
import { NavMenu as data } from '../../../data/utilities/navMenu';

export default function Nav() {
  const [menuState, setMenuState] = React.useState(false);
  const [accountState, setAccountState] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loggedOut, setLoggedOut] = React.useState(false);

  const router = useRouter();

  const getAccount = () => {
    console.log('ran')
    if (sessionStorage.getItem('accessToken')) {
      setLoggedIn(true);
    };
  };

  const LogOut = () => {
    sessionStorage.removeItem('accessToken');
    setLoggedIn(false);
    setLoggedOut(true);
    setTimeout(() => {
      setLoggedOut(false);
    }, 1000);
  };

  const toggleAccount = () => {
    setAccountState(!accountState);
    setMenuState(false);
  };

  const toggleMenu = () => {
    setAccountState(false);
    setMenuState(!menuState);
  };
  
  React.useEffect(() => {
    router.events.on('routeChangeComplete', getAccount)
    getAccount();
  }, [router.events]);
  return (
    <div>
      <div className="u-nav-wrapper">
        {loggedIn && (
          <div className="u-nav-account">
            <Icon
              className={`u-nav-button ${
                accountState && 'u-nav-account--open'
              }`}
              iconName="member"
              width="32"
              height="32"
              onClick={toggleAccount}
            />
            <div
              className={`u-nav-account__menu ${
                accountState && 'u-nav-account__menu--open'
              }`}>
              <Link href="/" onClick={LogOut}>
                Log out
              </Link>
            </div>
          </div>
        )}
        {loggedOut && (
          <div className="u-nav-logged-out">
            <p>You have been logged out</p>
          </div>
        )}
        <button
          className={`u-nav-button ${menuState && 'u-nav-button--open'}`}
          onClick={toggleMenu}>
          <span className="u-nav-button__line"></span>
          <span className="u-nav-button__line"></span>
          <span className="u-nav-button__line"></span>
        </button>
        <div className={`u-nav-menu ${menuState && 'u-nav-menu--open'}`}>
          <nav>
            <ul className="u-nav-menu__list">
              {data.map((item, i) => {
                return (
                  <li
                    key={item.title + i}
                    className={`u-nav-menu__list__item ${
                      router.pathname === item.url
                        ? 'u-nav-menu__list__item--active'
                        : ''
                    }`}>
                    <Link
                      href={item.url}
                      onClick={() => setMenuState(!menuState)}>
                      {item.title}
                    </Link>
                    {item.sub && (
                      <ul className="u-nav-menu__list__item__menu">
                        {item.sub.map((subItem, i) => {
                          return (
                            <li
                              key={subItem.title + i}
                              className={`u-nav-menu__list__item__sub ${
                                router.pathname === subItem.url
                                  ? 'u-nav-menu__list__item--active'
                                  : ''
                              }`}>
                              <Link
                                href={subItem.url}
                                onClick={() => setMenuState(!menuState)}>
                                {subItem.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
