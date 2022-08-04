import React from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { InitialCards } from "../../utils/initialCards";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList cards={InitialCards} />
      <button className="movies__more-btn">Ещё</button>
    </section>
  )
};

export default Movies;