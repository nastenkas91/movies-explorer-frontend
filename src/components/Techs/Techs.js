import React from "react";
import './Techs.css';
import SectionTitle from "../SectionTitle/SectionTitle";

function Techs() {
  return (
    <section className='techs'>
      <div className="techs__wraper">
        <SectionTitle title={'Технологии'} />
        <p className="techs__text techs__text_type_header">7 технологий</p>
        <p className="techs__text techs__text_type_description">На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__list-item">
            <p className="techs__text techs__text_type_list-item">HTML</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__text techs__text_type_list-item">CSS</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__text techs__text_type_list-item">JS</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__text techs__text_type_list-item">React</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__text techs__text_type_list-item">Git</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__text techs__text_type_list-item">Express.js</p>
          </li>
          <li className="techs__list-item">
            <p className="techs__text techs__text_type_list-item">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;