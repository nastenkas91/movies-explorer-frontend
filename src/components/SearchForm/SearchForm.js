import React, {useEffect, useState} from "react";
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import {useLocation} from "react-router-dom";

function SearchForm({ handleMovieSearch, handleCheckboxToggle }) {
  const location = useLocation();
  const [request, setRequest] = useState('')
  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [error, setError] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  function handleChange(e) {
    setRequest(e.target.value);
    setError(e.target.validationMessage);
    setFormIsValid(e.target.closest('.form').checkValidity())
  }

  useEffect(() => {
    if (localStorage.getItem('request') && location.pathname === '/movies') {
      const prevReq = JSON.parse(localStorage.getItem('request'));
      setRequest(prevReq);
      setIsShortMovieChecked(JSON.parse(localStorage.getItem('shortMovieChecked')));
      //handleMovieSearch(JSON.parse(localStorage.getItem('request')), JSON.parse(localStorage.getItem('shortMovieChecked')))
    }
  }, [])

  function handleCheckboxClick(e) {
    setIsShortMovieChecked(e.target.checked);
    if (location.pathname === '/movies') {
      localStorage.setItem('shortMovieChecked', JSON.stringify(e.target.checked));
      handleCheckboxToggle(e.target.checked, 'movies');
    } else if (location.pathname === '/saved-movies') {
      handleCheckboxToggle(e.target.checked, 'moviesOnSaved');
    }
  }

  function handleSubmit(e) {
    if (formIsValid) {
      e.preventDefault();
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
        <button type="submit" className='search__submit-btn' disabled={!formIsValid}></button>
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