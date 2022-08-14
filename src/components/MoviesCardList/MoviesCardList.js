import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";
import {moviesUrl} from "../../utils/constants";

function MoviesCardList({ cards, handleMovieSaving, handleMovieDelete }) {
  return (
    <ul className="movies__card-list">
      {
        cards.map(movie => (<MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            handleMovieSaving={handleMovieSaving}
            handleMovieDelete={handleMovieDelete}
          />)
        )}
    </ul>
  )
};

export default MoviesCardList;