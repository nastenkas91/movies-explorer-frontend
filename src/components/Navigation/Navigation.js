import React from "react";
import './Navigation.css';
import {NavLink} from "react-router-dom";
import {useLocation} from "react-router";
import accountLogo from "../../images/account-icon-main.svg"
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import BurgerButton from "../BurgerButton/BurgerButton";

function Navigation({ isBurgerMenuOpen, handleMenuState }) {
  const location = useLocation();

  return (
    <nav className='navigation'>
      <HeaderLogo />

      {/*меню лэндинга и страниц аккаунта для авторизованного пользователя*/}
      <div className={`navigation__wraper`}>
        <div className={`navigation__link-container ${location.pathname === '/' && 'navigation__link-container_landing'}`}>
          <NavLink to='/movies' className={`navigation__link navigation__link_logged 
            ${location.pathname === '/movies' && 'navigation__link_active'}`}>Фильмы</NavLink>
          <NavLink to='/saved-movies' className={`navigation__link navigation__link_logged
          ${location.pathname === '/saved-movies' && 'navigation__link_active'}`}>Сохранённые фильмы</NavLink>
        </div>
        <NavLink to='/profile' className={`navigation__link navigation__link_accaunt
        ${location.pathname === '/profile' && 'navigation__link_active'}`}>Аккаунт
          <img className='navigation__account-logo' src={accountLogo} />
        </NavLink>
      </div>

      {/*бургерное меню для лэндинга и страниц аккаунта авторизованного пользователя*/}
      <BurgerButton isOpen={isBurgerMenuOpen} handleMenuState={handleMenuState} />
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        handleLinkClick={handleMenuState}
      />
    </nav>
  );
}

export default Navigation;
