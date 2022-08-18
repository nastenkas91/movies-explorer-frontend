//Фильтрация по названию
import {shortMovieDuration} from "./constants";

export function filterMoviesByTitle(movies, request) {
  return movies.filter(function(movie) {
    return movie.nameRU.toLowerCase().indexOf(request.toLowerCase()) > -1
      || (movie.nameEN && movie.nameEN.toLowerCase().indexOf(request.toLowerCase()) > -1)
  })
}

//Проверка по длительности
export function handleDurationFiltration(movies) {
  return movies.filter(movie => {
    return movie.duration <= shortMovieDuration;
  });
}