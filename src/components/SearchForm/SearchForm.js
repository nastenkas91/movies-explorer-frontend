import React, {useEffect, useState} from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search-icon.svg';
import useFormValidation from "../../utils/useFormValidation";
import {useLocation} from "react-router-dom";

function SearchForm({ handleMovieSearch, isShortMovieChecked, handleCheckboxClick, request }) {
  const { values, errors, isValid, formIsValid, handleChange } = useFormValidation({searchRequest: request || ''});

  function handleSubmit(e) {
    if (formIsValid) {
      e.preventDefault();
      handleMovieSearch(values.searchRequest, isShortMovieChecked);
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
          value={values.searchRequest}
          onChange={handleChange}
          required />
        <button type="submit" className='search__submit-btn' disabled={!formIsValid}></button>
      </form>
      <span className='search__error'>{errors.searchRequest}</span>
      <div className="search__line"></div>
      <FilterCheckbox isChecked={isShortMovieChecked} handleCheckboxClick={handleCheckboxClick}/>
    </section>
  )
};

export default SearchForm;