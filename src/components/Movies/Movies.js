import React from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ handleMovieSearch, movies, isShortMovieChecked, handleCheckboxClick, isLoading, request, handleMovieSaving, handleMovieDelete }) {


  return (
    <section className="movies">
      <SearchForm handleMovieSearch={handleMovieSearch} handleCheckboxClick={handleCheckboxClick} isShortMovieChecked={isShortMovieChecked} request={request} />
      { isLoading && <Preloader/> }
      <MoviesCardList cards={movies} handleMovieSaving={handleMovieSaving} handleMovieDelete={handleMovieDelete} />
      <button type="button" className="movies__more-btn">Ещё</button>
    </section>
  )
};

export default Movies;