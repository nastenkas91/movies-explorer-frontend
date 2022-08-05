import React, {useState} from "react";
import './BurgerMenu.css'
import {NavLink} from "react-router-dom";
import accountLogo from "../../images/account-icon-main.svg";
import {useLocation} from "react-router";

function BurgerMenu() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  function handleMenuState() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <input id='burger-toggle' type="checkbox" className='burger__checkbox' checked={isOpen} onChange={handleMenuState} />
      <label htmlFor='#burger-toggle' className='burger__button'>
        <span className='burger__line'></span>
      </label>

      <div className="burger__menu-cover">
        <ul className="burger__menu">
          <li className="burger__menu-item">
            <NavLink
              to='/'
              className={`burger__menu-link ${location.pathname === '/' && 'burger__menu-link_active'}`}
              onClick={handleMenuState}>
              Главная
            </NavLink>
          </li>

          <li className="burger__menu-item">
            <NavLink
              to='/movies'
              className={`burger__menu-link ${location.pathname === '/movies' && 'burger__menu-link_active'}`}
              onClick={handleMenuState}>
              Фильмы
            </NavLink>
          </li>

          <li className="burger__menu-item">
            <NavLink
              to='/saved-movies'
              className={`burger__menu-link ${location.pathname === '/saved-movies' && 'burger__menu-link_active'}`}
              onClick={handleMenuState}>
              Сохранённые фильмы
            </NavLink>
          </li>

          <li className="burger__menu-item">
            <NavLink
              to='/profile'
              className={`burger__menu-link burger__menu-link_account ${location.pathname === '/profile' && 'burger__menu-link_active'}`}
              onClick={handleMenuState}>
              Аккаунт
              <img alt='профиль' className='burger__account-logo' src={accountLogo} />
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  )
};

export default BurgerMenu;