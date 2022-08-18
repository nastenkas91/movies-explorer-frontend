import React, {useEffect, useState} from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ handleMovieDelete, handleMovieSearch, shownSavedMovies, setShownSavedMovies, checkWindowSize, nothingFound }) {

  useEffect(() => {
    if (localStorage.getItem('savedMovies')) {
      checkWindowSize();
      const previousResult = JSON.parse(localStorage.getItem('savedMovies'));
      setShownSavedMovies(previousResult);
    }
  }, [])

  return (
    <div className="saved-movies">
      <SearchForm handleMovieSearch={handleMovieSearch} setShownSavedMovies={setShownSavedMovies} />
      <MoviesCardList cards={shownSavedMovies} handleMovieDelete={handleMovieDelete} nothingFound={nothingFound} />
    </div>
  )
};

export default SavedMovies;