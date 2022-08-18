import React from "react";
import './BurgerButton.css'

function BurgerButton({ isOpen, handleMenuState }) {
  return (
    <>
      <input id='burger-toggle' type="checkbox" className='burger-button__checkbox' checked={isOpen} onChange={handleMenuState} />
      <label htmlFor='#burger-toggle' className='burger-button'>
        <span className='burger-button__line'></span>
      </label>
    </>
  )
}

export default BurgerButton;