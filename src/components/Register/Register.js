import React from "react";
import './Register.css';
import Form from '../Form/Form';

function Register() {
  return (
    <div className="register">
      <Form
        title={'Добро пожаловать!'}
        isRegForm={true}
        button={'Зарегистрироваться'}
        spanText={'Уже зарегистрированы?'}
        spanBtn={' Войти'}
        spanBtnLink={'/signin'}
      />
    </div>
  )
};

export default Register;