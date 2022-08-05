import React from "react";
import './Promo.css'
import landingLogo from "../../images/landing-logo.svg"

function Promo() {
  return (
    <section className="promo">
      <div className="promo-wraper">
        <div className="promo__description-container">
          <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__description">Листайте ниже, чтобы узнать
            больше про этот проект и его создателя.</p>
          <button type="button" className="promo__more-btn">
            <a href='#aboutProject' className="promo__more-link">Узнать больше</a>
          </button>
        </div>
        <img className="promo__logo" src={landingLogo} alt="логотип" />
      </div>
    </section>
  )
}

export default Promo;