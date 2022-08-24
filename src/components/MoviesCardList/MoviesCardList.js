import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import { notFoundMessage} from "../../utils/constants";

function MoviesCardList({ cards, savedMovies, handleMovieSaving, handleMovieDelete, amountOfCards, nothingFound }) {

  return (
    <>
      {
        nothingFound ?
          <div className={'movies__card-list_empty'}>{notFoundMessage}</div>
          :
          <ul className="movies__card-list">
            {
              cards.slice(0, amountOfCards).map(movie => (<MoviesCard
                  key={movie.id || movie._id}
                  movie={movie}
                  handleMovieSaving={handleMovieSaving}
                  handleMovieDelete={handleMovieDelete}
                  savedMovies={savedMovies}
                />)
              )}
          </ul>
      }
    </>
  )
};

export default MoviesCardList;