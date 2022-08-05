import React from "react";
import './AboutProject.css';
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject() {
  return (
    <section className="about-project" id='aboutProject'>
      <div className="about-project__wraper">
        <SectionTitle title='О проекте' />
        <ul className="about-project__container">
          <li className='about-project__steps'>
            <p className="about-project__text about-project__text_type_header">Дипломный проект включал 5 этапов</p>
          </li>
          <li className='about-project__steps-description'>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.</p>
          </li>
          <li className='about-project__time'>
            <p className="about-project__text about-project__text_type_header">На выполнение диплома ушло 5 недель</p>
          </li>
          <li className='about-project__time-description'>
            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className="about-project__timeline-container">
          <div className="about-project__timeline about-project__timeline_color_blue">
            <p className="about-project__timeline-text about-project__timeline-text_color_white">1 неделя</p>
          </div>
          <div className="about-project__timeline about-project__timeline_color_gray">
            <p className="about-project__timeline-text about-project__timeline-text_color_black">4 недели</p>
          </div>
          <p className="about-project__timeline-text">Back-end</p>
          <p className="about-project__timeline-text">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;