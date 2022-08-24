import React, {useEffect} from "react";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import {useLocation} from "react-router-dom";

function Movies({ handleMovieSearch, isLoading, handleMovieSaving, handleMovieDelete, checkWindowSize, amountOfCards, setAmountOfCards, rowLength, filteredMovies, setFilteredMovies, nothingFound, savedMovies  }) {
  const location = useLocation();

  //кнопка "Еще"
  function handleMoreButtonClick() {
    const newAmountOfCards = amountOfCards + rowLength;
    setAmountOfCards(newAmountOfCards);
  }

  useEffect(() => {
    if (localStorage.getItem('filteredMovies')) {
      checkWindowSize();
      const previousResult = JSON.parse(localStorage.getItem('filteredMovies'));
      setFilteredMovies(previousResult);
    }
  }, [])

  return (
    <section className="movies">
      <SearchForm handleMovieSearch={handleMovieSearch} setFilteredMovies={setFilteredMovies} />
      { isLoading && <Preloader/> }
      <MoviesCardList cards={filteredMovies} handleMovieSaving={handleMovieSaving} handleMovieDelete={handleMovieDelete} amountOfCards={amountOfCards} nothingFound={nothingFound} savedMovies={savedMovies} />
      {
        (location.pathname === '/movies' && filteredMovies.length > amountOfCards)
        &&
        <button type="button" className={`movies__more-btn movies__more-btn_visible`} onClick={handleMoreButtonClick} >Ещё</button>
      }
    </section>
  )
};

export default Movies;