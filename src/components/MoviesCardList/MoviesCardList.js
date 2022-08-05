import React from "react";
import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ cards }) {
  return (
    <ul className="movies__card-list">
      {
        cards.map(c => (<MoviesCard
            key={c.id}
            image={c.image}
            duration={c.duration}
            nameRU={c.nameRU}
          />)
        )}
    </ul>
  )
};

export default MoviesCardList;