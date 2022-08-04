import React from "react";
import './Footer.css';
import {useLocation} from "react-router-dom";

function Footer() {
  let location = useLocation();
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className={`footer ${(location.pathname === '/' 
    || location.pathname === '/saved-movies'
    || location.pathname === '/movies')
    && 'display_flex'}`}>
      <div className="footer__wraper">
        <p className="footer__project-title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
          <p className="footer__copyright">&copy;{year}</p>
          <ul className='footer__link-list'>
            <li className="footer__link-item">
              <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
            </li>
            <li className="footer__link-item">
              <a href='https://github.com/nastenkas91' target='_blank' className="footer__link">Github</a>
            </li>
            <li className="footer__link-item">
              <a href='https://www.facebook.com/nasta.semenova' target='_blank' className="footer__link">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
};

export default Footer;