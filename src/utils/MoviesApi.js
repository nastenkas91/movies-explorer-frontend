import { moviesUrl } from "./constants";

class MoviesApi {
  constructor(moviesUrl) {
    this._moviesUrl = moviesUrl;
  }

  _CheckResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getMovies() {
    return fetch(`${this._moviesUrl}/beatfilm-movies`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(this._CheckResponse)
  }
}

export const moviesApi = new MoviesApi(moviesUrl)