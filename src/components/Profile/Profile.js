import React, {useContext, useEffect, useState} from "react";
import './Profile.css';
import {NavLink} from "react-router-dom";
import useFormValidation from "../../utils/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({ handleLogOut, handleUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, setValues, errors, isValid, formIsValid, handleChange } = useFormValidation({ name: currentUser.name, email: currentUser.email});
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInputDisabled, setIsInputDisabled] =useState(true);

  useEffect(() => {
    setValues({name: currentUser.name, email: currentUser.email});
  }, [currentUser, setValues])

  function handleUpdateButton() {
    setIsUpdating(true);
    setIsInputDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsUpdating(false);
    setIsInputDisabled(true);
    handleUpdateProfile({ name: values.name, email: values.email})
  }
  return (
    <section className="profile">
      <form className="form profile__form" onSubmit={handleSubmit} noValidate>
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <div className="profile__input-wraper">
        <p className="profile__input-placeholder">Имя</p>
        <input
          name='name'
          type="text"
          className="profile__input"
          required
          minLength='2'
          maxLength='30'
          value={values.name || ''}
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
          value={values.email || ''}
          onChange={handleChange}
          disabled={isInputDisabled}
        />
      </div>
      <span className='form__error'>{errors.email}</span>
      <div className={`profile__btn-wraper ${isUpdating && 'profile__btn-wraper_invisible'}`}>
        <button type='button' className="profile__update-btn" onClick={handleUpdateButton}>Редактировать</button>
        <NavLink onClick={handleLogOut} to='/' className="profile__leave-btn">Выйти из аккаунта</NavLink>
      </div>
      <button type="submit" disabled={!formIsValid} type='submit' className={`profile__submit-btn ${!isUpdating && 'profile__btn-wraper_invisible'}
      ${!formIsValid && 'profile__submit-btn_disabled'}`}>Сохранить</button>
    </form>
    </section>
  )
}

export default Profile;