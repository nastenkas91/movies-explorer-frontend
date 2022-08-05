import React, {useState} from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";

function MoviesCard({ nameRU, duration, image }) {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  function onLikeBtnClick() {
    setIsLiked(!isLiked);
  }

  function convertMinToHrs(min) {
    return `${Math.floor(min/60)}ч ${min%60}м`;
  };

  return (
    <li className="card">
      <a className="card__video__link">
        <img src={image} alt={nameRU} className="card__image"/>
      </a>
      <div className="card__title-container">
        <h4 className="card__title">{nameRU}</h4>
        {
          location.pathname === '/movies' &&
          <button type="button" className={`card__btn card__btn_like-off ${isLiked && 'card__btn_like-on'}`} onClick={onLikeBtnClick}></button>
        }
        {
          location.pathname === '/saved-movies' &&
          <button type="button" className="card__btn card__btn_delete"></button>
        }
      </div>
      <p className="card__duration">{convertMinToHrs(duration)}</p>
    </li>
  )
};

export default MoviesCard;