import React from "react";
import './NotFoundPage.css';
import { useNavigate } from "react-router-dom";

function NotFoundPage( ) {
  const navigate = useNavigate();

  function goBack() {
    console.log('click')
    navigate(-2)
  }

  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__message">Страница не найдена</p>
      <button type="button" className="not-found__back-btn" onClick={goBack}>Назад</button>
    </div>
  )
};

export default NotFoundPage;