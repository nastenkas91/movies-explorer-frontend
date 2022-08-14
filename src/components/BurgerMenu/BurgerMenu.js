import './BurgerMenu.css'
import {NavLink} from "react-router-dom";
import accountLogo from "../../images/account-icon-main.svg";
import {useLocation} from "react-router";
import {useEffect} from "react";

function BurgerMenu({ handleLinkClick, isOpen }) {
  const location = useLocation();

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      handleLinkClick();
    }
  }

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') {
        handleLinkClick();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  return (
    <div className={`burger__menu-container ${isOpen ? 'burger__menu-container_opened' : ''}`} onClick={handleOverlayClick}>
      <ul className="burger__menu">
        <li className="burger__menu-item">
          <NavLink
            to='/'
            className={`burger__menu-link ${location.pathname === '/' && 'burger__menu-link_active'}`}
            onClick={handleLinkClick}>
            Главная
          </NavLink>
        </li>

        <li className="burger__menu-item">
          <NavLink
            to='/movies'
            className={`burger__menu-link ${location.pathname === '/movies' && 'burger__menu-link_active'}`}
            onClick={handleLinkClick}>
            Фильмы
          </NavLink>
        </li>

        <li className="burger__menu-item">
          <NavLink
            to='/saved-movies'
            className={`burger__menu-link ${location.pathname === '/saved-movies' && 'burger__menu-link_active'}`}
            onClick={handleLinkClick}>
            Сохранённые фильмы
          </NavLink>
        </li>

        <li className="burger__menu-item">
          <NavLink
            to='/profile'
            className={`burger__menu-link burger__menu-link_account ${location.pathname === '/profile' && 'burger__menu-link_active'}`}
            onClick={handleLinkClick}>
            Аккаунт
            <img alt='профиль' className='burger__account-logo' src={accountLogo} />
          </NavLink>
        </li>
      </ul>
    </div>
  )
};

export default BurgerMenu;