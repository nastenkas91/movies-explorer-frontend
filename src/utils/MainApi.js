import {baseUrl, moviesUrl} from "./constants";

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  get _token() {
    return `Bearer ${localStorage.getItem('jwt')}`
  }

  _CheckResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._CheckResponse)
  }

  editProfileInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
      .then(this._CheckResponse)
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._CheckResponse)
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        country: movie.country ? movie.country : 'default',
        description: movie.description ? movie.description : 'default',
        director: movie.director ? movie.director : 'default',
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : 0,
        image: movie.image ? moviesUrl + movie.image.url : 'default',
        trailerLink: movie.trailerLink ? movie.trailerLink : 'default',
        nameRU: movie.nameRU ? movie.nameRU : 'default',
        nameEN: movie.nameEN ? movie.nameEN : 'default',
        thumbnail: movie.image ? moviesUrl + movie.image.formats.thumbnail.url : 'default',
        movieId: movie.id
      })
    })
      .then(this._CheckResponse)
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${this._token}`
      }
    })
      .then(this._CheckResponse)
  }

}

export const mainApi = new MainApi(baseUrl);