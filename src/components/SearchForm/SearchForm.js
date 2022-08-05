import React from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import searchIcon from '../../images/search-icon.svg'

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <img src={searchIcon} alt="" className="search__icon"/>
        <input type="text" className="search__input" placeholder={'Фильм'} required />
        <button type="submit" className="search__submit-btn"></button>
      </form>
      <div className="search__line"></div>
      <FilterCheckbox />
    </section>
  )
};

export default SearchForm;