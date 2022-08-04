import React from "react";
import './Form.css';
import {NavLink} from "react-router-dom";
import useFormValidation from "../../utils/validateForm";
import HeaderLogo from "../HeaderLogo/HeaderLogo";

function Form({ title, isRegForm, button, spanText, spanBtn, spanBtnLink }) {
  const { userData, errors, isValid, formIsValid, handleChange } = useFormValidation({});

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className='form' onSubmit={handleSubmit} noValidate>
      <HeaderLogo />
      <h3 className="form__title">{title}</h3>
        {isRegForm &&
          <>
            <label htmlFor='regName' className='form__input-label'>Имя</label>
            <input
              name='name'
              minLength='2'
              maxLength='30'
              type="text"
              className={`form__input-field ${isValid.name ? '' : 'form__input-field_type_invalid'}`}
              id='regName'
              autoFocus={true}
              required
              value={userData['name'] || ''}
              onChange={handleChange}
            />
            <span className='form__error'>{errors.name}</span>
          </>}
      <label htmlFor='regEmail' className="form__input-label">E-mail</label>
      <input
        type="email"
        className={`form__input-field ${isValid.email ? '' : 'form__input-field_type_invalid'}`}
        name='email'
        id='regEmail'
        required
        value={userData['email'] || ''}
        onChange={handleChange}
      />
      <span className='form__error'>{errors.email}</span>
      <label htmlFor='regPassword' className="form__input-label">Пароль</label>
      <input
        type="password"
        minLength='3'
        className={`form__input-field ${isValid.password ? '' : 'form__input-field_type_invalid'}`}
        name='password'
        id='regPassword'
        required
        value={userData['password'] || ''}
        onChange={handleChange}
      />
      <span className='form__error'>{errors.password}</span>
      <div className="form__btn-wraper">
        <button className={`form__button ${!formIsValid ? 'form__button_type_disabled' : ''}`}>{button}</button>
        <p className="form__span-login">{spanText}
          <NavLink to={spanBtnLink} className='form__span-btn'>{spanBtn}</NavLink>
        </p>
      </div>
    </form>
  )
};

export default Form;