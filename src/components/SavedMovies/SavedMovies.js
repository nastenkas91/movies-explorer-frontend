import React, {useEffect, useState} from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { InitialSavedCards} from "../../utils/initialCards";

function SavedMovies({ shownSavedMovies, handleMovieDelete, handleCheckboxToggle, handleMovieSearch, nothingFound }) {

  return (
    <div className="saved-movies">
      <SearchForm handleCheckboxToggle={handleCheckboxToggle} handleMovieSearch={handleMovieSearch} />
      <MoviesCardList cards={shownSavedMovies} handleMovieDelete={handleMovieDelete} nothingFound={nothingFound} />
    </div>
  )
};

export default SavedMovies;