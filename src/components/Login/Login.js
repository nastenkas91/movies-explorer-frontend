import React from "react";
import './Login.css';
import Form from '../Form/Form';

function Login({ handleLogin }) {
  return (
    <div className="login">
      <Form
        title={'Рады видеть!'}
        isRegForm={false}
        button={'Войти'}
        spanText={'Ещё не зарегистрированы?'}
        spanBtn={' Регистрация'}
        spanBtnLink={'/signup'}
        handleSubmit={handleLogin}
      />
    </div>
  )
};

export default Login;