import React from "react";
import './AboutMe.css';
import SectionTitle from "../SectionTitle/SectionTitle";
import myPhoto from '../../images/me.jpeg'

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__wraper">
        <SectionTitle title='Студент' />
        <div className="about-me__info-container">
          <p className="about-me_title">Анастасия</p>
          <p className="about-me_subtitle">Начинающий фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">Я живу в Москве, закончила факультет аэронавигационного обслуживания УВАУ ГА(и),
            с 2014 года работаю по специальности. В свободное время бегаю, учу языки - иностранные и JS. Начинаю свой путь
            в веб-разработке</p>
          <ul className="about-me__links-list">
            <li className="about-me__links-item">
              <a href='https://www.facebook.com/nasta.semenova' target='_blank' className="about-me__link">Facebook</a>
            </li>
            <li className="about-me__links-item">
              <a href='https://github.com/nastenkas91' target='_blank' className="about-me__link">Github</a>
            </li>
          </ul>
          <img src={myPhoto} alt="моя фотография" className="about-me__photo"/>
        </div>
        <h3 className="about-me__portfolio-header">Портфолио</h3>
        <ul className="about-me__portfolio-list">
          <li className="about-me__portfolio-item">
            <a href="https://nastenkas91.github.io/how-to-learn/" target='_blank' className="about-me__portfolio-link">Статичный сайт</a>
          </li>
          <li className="about-me__portfolio-item">
            <a href="https://nastenkas91.github.io/russian-travel/" target='_blank' className="about-me__portfolio-link">Адаптивный сайт</a>
          </li>
          <li className="about-me__portfolio-item">
            <a href="https://mesto-project.nomoredomains.sbs" target='_blank' className="about-me__portfolio-link">Одностраничное приложение</a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutMe;
