import React from "react";
import './Header.css';
import {NavLink, useLocation} from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

function Header({ loggedIn, isBurgerMenuOpen, handleMenuState }) {
  let location = useLocation();

  return (
    <header className={`header ${location.pathname === '/' && 'display_flex header_place_landing'}
      ${(location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile') && 'display_flex'}`}>

      <div className="header__wraper">

        {/*меню лэндинга для неавторизованного пользователя*/}
        {(location.pathname === '/' && !loggedIn)
          &&
          <>
            <HeaderLogo />
            <div className={`header__link-wraper`}>
              <NavLink to='/signup' className="header__link">Регистрация</NavLink>
              <NavLink to='/signin' className="header__link header__link_signin">Войти</NavLink>
            </div>
          </>
        }

        {/*меню лэндинга и страниц аккаунта для авторизованного пользователя tbd после реализации авторизации */}
        {
          loggedIn && <Navigation isBurgerMenuOpen={isBurgerMenuOpen}  handleMenuState={handleMenuState} />
        }

      </div>
    </header>
  )
}

export default Header;