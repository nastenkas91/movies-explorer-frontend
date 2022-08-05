import React from "react";
import './Header.css';
import {NavLink, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

function Header({ loggedIn }) {
  let location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' && 'display_flex header_place_landing'}
      ${(location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile') && 'display_flex'}`}>

      <div className="header__wraper">

        {/*меню лэндинга для неавторизованного пользователя*/}
        {/*{(location.pathname === '/' && !loggedIn)*/}
        {(location.pathname === '/')
          &&
          <>
            <HeaderLogo />
            <div className={`header__link-wraper`}>
              <NavLink to='/signup' className="header__link">Регистрация</NavLink>
              <NavLink to='/signin' className="header__link header__link_signin">Войти</NavLink>
            </div>
          </>
        }

        {/*меню страниц аккаунта для авторизованного пользователя */}
        {(location.pathname === '/movies'
          || location.pathname === '/saved-movies'
          || location.pathname === '/profile') && <Navigation />}

        {/*меню лэндинга и страниц аккаунта для авторизованного пользователя tbd после реализации авторизации */}
        {/*{*/}
        {/*  loggedIn && <Navigation />*/}
        {/*}*/}

      </div>
    </header>
  )
}

export default Header;