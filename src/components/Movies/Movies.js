import React, {useState} from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({ handleMovieSearch, filteredMovies, handleCheckboxToggle, isLoading, handleMovieSaving, handleMovieDelete, amountOfCards, isMoreButtonVisible, handleMoreButtonClick, nothingFound  }) {



  return (
    <section className="movies">
      <SearchForm handleMovieSearch={handleMovieSearch} handleCheckboxToggle={handleCheckboxToggle} />
      { isLoading && <Preloader/> }
      <MoviesCardList cards={filteredMovies} handleMovieSaving={handleMovieSaving} handleMovieDelete={handleMovieDelete} amountOfCards={amountOfCards} nothingFound={nothingFound} />
      <button type="button" className={`movies__more-btn ${isMoreButtonVisible ? 'movies__more-btn_visible' : ''}`} onClick={handleMoreButtonClick} >Ещё</button>
    </section>
  )
};

export default Movies;