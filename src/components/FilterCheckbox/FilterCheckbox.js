import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className="checkbox__switch" htmlFor="checkbox">
      <input type="checkbox" id="checkbox" className='checkbox__input'/>
      <div className="checkbox__slider checkbox__round"></div>
      <span className="checkbox__label-text">Короткометражки</span>
    </label>
  )
};

export default FilterCheckbox;