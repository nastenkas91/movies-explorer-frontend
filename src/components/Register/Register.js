import React from "react";
import './Register.css';
import Form from '../Form/Form';

function Register({ handleRegister }) {

  return (
    <div className="register">
      <Form
        title={'Добро пожаловать!'}
        isRegForm={true}
        button={'Зарегистрироваться'}
        spanText={'Уже зарегистрированы?'}
        spanBtn={' Войти'}
        spanBtnLink={'/signin'}
        handleSubmit={handleRegister}
      />
    </div>
  )
};

export default Register;