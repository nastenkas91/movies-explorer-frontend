import React, {useContext, useState} from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import {moviesUrl} from "../../utils/constants";

function MoviesCard({ movie, handleMovieSaving, handleMovieDelete }) {
  const location = useLocation();
  let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const isSaved = savedMovies.some(m => m.movieId === movie.id || m.movieId === movie.movieId)

  const handleLikeBtnClick = () => {
    if (!isSaved ) {
        handleMovieSaving(movie);
      } else {
      handleMovieDelete(movie);
    }
  }

  const handleDeleteButtonClick = () => {
    handleMovieDelete(movie)
  }

  function convertMinToHrs(min) {
    return `${Math.floor(min/60)}ч ${min%60}м`;
  };

  return (
    <li className="card">
      <a className="card__video__link" href={movie.trailerLink} target={'_blank'}>
        {/*<img src={location.pathname === '/movies' ? `${moviesUrl}/${movie.image.url}` : `${movie.image}`} alt={movie.nameRU} className="card__image"/>*/}
        <img src={movie.image.url ? `${moviesUrl}${movie.image.url}` : `${movie.image}`} alt={movie.nameRU} className="card__image"/>
        {/*<div className="card-image" style={{ background: `url(${!isSaved && movie.image.url ? moviesUrl + movie.image.url : movie.image})` }}></div>*/}
      </a>
      <div className="card__title-container">
        <h4 className="card__title">{movie.nameRU}</h4>
        {
          location.pathname === '/movies' &&
          <button type="button" className={`card__btn card__btn_like-off ${isSaved && 'card__btn_like-on'}`} onClick={handleLikeBtnClick}></button>
        }
        {
          location.pathname === '/saved-movies' &&
          <button type="button" className="card__btn card__btn_delete" onClick={handleDeleteButtonClick}></button>
        }
      </div>
      <p className="card__duration">{convertMinToHrs(movie.duration)}</p>
    </li>
  )
};

export default MoviesCard;