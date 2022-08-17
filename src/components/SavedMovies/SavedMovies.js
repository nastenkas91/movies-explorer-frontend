import React, {useEffect, useState} from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { InitialSavedCards} from "../../utils/initialCards";

function SavedMovies({ savedMovies, shownSavedMovies, handleMovieDelete, handleCheckboxClick, handleMovieSearch, isShortMovieChecked, nothingFound }) {

  // useEffect(() => {
  //   shownSavedMovies = savedMovies
  // }, [])

  return (
    <div className="saved-movies">
      <SearchForm handleCheckboxClick={handleCheckboxClick} isShortMovieChecked={isShortMovieChecked} handleMovieSearch={handleMovieSearch} />
      <MoviesCardList cards={shownSavedMovies} handleMovieDelete={handleMovieDelete} nothingFound={nothingFound} />
    </div>
  )
};

export default SavedMovies;