import React, {useContext, useState} from "react";
import './Profile.css';
import Navigation from "../Navigation/Navigation";
import {NavLink} from "react-router-dom";
import useFormValidation from "../../utils/validateForm";
import {isDisabled} from "@testing-library/user-event/dist/utils";

function Profile() {
  const { userData, errors, isValid, formIsValid, handleChange } = useFormValidation({name: 'Анастасия', email: 'mail@mail.ru'});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInputDisabled, setIsInputDisabled] =useState(true);

  function handleUpdateButton() {
    setIsUpdating(true);
    setIsInputDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsUpdating(false);
    setIsInputDisabled(true);
  }
  return (
    <section className="profile">
      <form className="form profile__form" onSubmit={handleSubmit} noValidate>
      <h2 className="profile__title">Привет, {userData.name}!</h2>
      <div className="profile__input-wraper">
        <p className="profile__input-placeholder">Имя</p>
        <input
          name='name'
          type="text"
          className="profile__input"
          required
          minLength='2'
          maxLength='30'
          value={userData.name}
          onChange={handleChange}
          disabled={isInputDisabled}
        />
      </div>
      <span className='form__error'>{errors.name}</span>
      <span className="profile__line"></span>
      <div className="profile__input-wraper">
        <p className="profile__input-placeholder">E-mail</p>
        <input
          name='email'
          type="email"
          className="profile__input"
          required
          value={userData.email}
          onChange={handleChange}
          disabled={isInputDisabled}
        />
      </div>
      <span className='form__error'>{errors.email}</span>
      <div className={`profile__btn-wraper ${isUpdating && 'profile__btn-wraper_invisible'}`}>
        <button type='button' className="profile__update-btn" onClick={handleUpdateButton}>Редактировать</button>
        <NavLink to='/' className="profile__leave-btn">Выйти из аккаунта</NavLink>
      </div>
      <button disabled={!formIsValid} type='submit' className={`profile__submit-btn ${!isUpdating && 'profile__btn-wraper_invisible'}
      ${!formIsValid && 'profile__submit-btn_disabled'}`}>Сохранить</button>
    </form>
    </section>
  )
}

export default Profile;