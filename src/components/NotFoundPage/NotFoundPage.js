import React from "react";
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__message">Страница не найдена</p>
      <button type="button" className="not-found__back-btn">Назад</button>
    </div>
  )
};

export default NotFoundPage;