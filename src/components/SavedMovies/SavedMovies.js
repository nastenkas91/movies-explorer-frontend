import React from "react";
import './SavedMovies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { InitialSavedCards} from "../../utils/initialCards";

function SavedMovies({ savedMovies, handleMovieDelete, handleCheckboxClick, isShortMovieChecked, handleMovieSearch }) {


  return (
    <div className="saved-movies">
      <SearchForm handleCheckboxClick={handleCheckboxClick} isShortMovieChecked={isShortMovieChecked} handleMovieSearch={handleMovieSearch} />
      <MoviesCardList cards={savedMovies} handleMovieDelete={handleMovieDelete} />
    </div>
  )
};

export default SavedMovies;