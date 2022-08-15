import React, {useEffect, useState} from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ handleMovieSearch, movies, handleCheckboxClick, isLoading, request, handleMovieSaving, handleMovieDelete, isShortMovieChecked, amountOfCards, isMoreButtonVisible, handleMoreButtonClick, nothingFound  }) {

  return (
    <section className="movies">
      <SearchForm handleMovieSearch={handleMovieSearch} handleCheckboxClick={handleCheckboxClick} isShortMovieChecked={isShortMovieChecked} request={request} />
      { isLoading && <Preloader/> }
      <MoviesCardList cards={movies} handleMovieSaving={handleMovieSaving} handleMovieDelete={handleMovieDelete} amountOfCards={amountOfCards} nothingFound={nothingFound} />
      <button type="button" className={`movies__more-btn ${isMoreButtonVisible ? 'movies__more-btn_visible' : ''}`} onClick={handleMoreButtonClick} >Ещё</button>
    </section>
  )
};

export default Movies;