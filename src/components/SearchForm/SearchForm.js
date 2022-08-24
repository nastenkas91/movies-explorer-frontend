import React, {useEffect, useState} from "react";
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import {useLocation} from "react-router-dom";
import {handleDurationFiltration} from "../../utils/utils";

function SearchForm({ handleMovieSearch, setFilteredMovies, setShownSavedMovies }) {
  const location = useLocation();
  const [request, setRequest] = useState('')
  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const input = e.target;
    setRequest(input.value);
    setIsValid(input.validity.valid);
    if (!input.validity.valid && input.value.length === 0) {
      setError('Нужно ввести ключевое слово');
    }
    else if (!input.validity.valid) {
      setError(input.validationMessage)
    } else {
      setError('')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('request') && location.pathname === '/movies') {
      const prevReq = JSON.parse(localStorage.getItem('request'));
      setRequest(prevReq);
      setIsShortMovieChecked(JSON.parse(localStorage.getItem('shortMovieChecked')));
    }
  }, [])

  //Фильтрация по длительности
  function handleCheckboxToggle(isShortMoviesOn, localStorageName) {
    const movies = JSON.parse(localStorage.getItem(`${localStorageName}`));

    if (isShortMoviesOn) {
      let filteredData = handleDurationFiltration(movies);
      if (location.pathname === '/movies') {
        setFilteredMovies(filteredData);
        localStorage.setItem('filteredMovies', JSON.stringify(filteredData));
      }
      else if (location.pathname === '/saved-movies') {
        setShownSavedMovies(filteredData)
      }
    }

    else {
      if (location.pathname === '/movies') {
        setFilteredMovies(movies);
      } else if (location.pathname === '/saved-movies') {
        setShownSavedMovies(movies)
      }
    }
  }

  function handleCheckboxClick(e) {
    setIsShortMovieChecked(e.target.checked);
    if (location.pathname === '/movies') {
      localStorage.setItem('shortMovieChecked', JSON.stringify(e.target.checked));
      handleCheckboxToggle(e.target.checked, 'movies');
    } else if (location.pathname === '/saved-movies') {
      handleCheckboxToggle(e.target.checked, 'moviesOnSaved');
    }
    setIsShortMovieChecked(e.target.checked);
  }

  function handleSubmit(e) {
    if (isValid) {
      e.preventDefault();
      localStorage.setItem('shortMovieChecked', JSON.stringify(isShortMovieChecked));
      handleMovieSearch(request, isShortMovieChecked);
      if (location.pathname === '/movies') {
        localStorage.setItem('request', JSON.stringify(request))
      }
    }
  }

  return (
    <section className="search">
      <form className="form search__form" noValidate onSubmit={handleSubmit}>
        <img src={searchIcon} alt="" className="search__icon"/>
        <input
          type="text"
          name='searchRequest'
          className="search__input"
          placeholder={'Фильм'}
          minLength='1'
          value={request}
          onChange={handleChange}
          required />
        <button type="submit" className='search__submit-btn' disabled={!isValid}></button>

      </form>
      <span className='search__error'>{error}</span>
      <div className="search__line"></div>

      <label className="search__switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" className='search__switch-input' onChange={handleCheckboxClick} checked={isShortMovieChecked}/>
        <div className="search__switch-slider search__switch-round"></div>
        <span className="search__switch-label">Короткометражки</span>
      </label>
    </section>
  )
};

export default SearchForm;