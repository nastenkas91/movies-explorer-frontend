import React, {useEffect, useState} from "react";
import './App.css';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import {Route, Routes, useNavigate} from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/auth';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { shortMovieDuration } from '../../utils/constants';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [isShortInSavedChecked, setIsShortInSavedChecked] = useState(false);
  const [request, setRequest] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [authFailed, setAuthFailed] =useState(false);

  //состояние попапов
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    if (localStorage.getItem('beatfilmMovies')) {
      setBeatfilmMovies(JSON.parse(localStorage.getItem('beatfilmMovies')));
    }
  }, [])

  //проверка токена
  function checkToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate('/movies');
          } else if (res.message) {
            return res.message
          }
        })
    } else {
      return;
    }
  }

  //
  useEffect(() => {
    if(loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(res => {
          setCurrentUser(res[0]);
          setSavedMovies(res[1]);
          localStorage.setItem('savedMovies', JSON.stringify(res[1]));
        })
        .catch(((err) => {
          console.log(err)
        }));
    }
  }, [loggedIn])

  //Регистрация
  const handleRegister = ({ name, email, password }) => {
    auth.register(name, email, password)
      .then((res) => {
        handleLogin({ email, password })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //авторизация
  function handleLogin({ email, password }) {
    auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
  }

  //выход из аккаунта
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.setItem('jwt', '');
    localStorage.setItem('beatfilmMovies', '');
    localStorage.setItem('movies', '');
    setBeatfilmMovies([]);
    setFilteredMovies([]);
    setSavedMovies([]);
  }

  //обновление профиля
  function handleUpdateProfile({ name, email }) {
    mainApi.editProfileInfo({ name: name, email: email })
      .then((info) => {
        setCurrentUser(info);
      })
      .catch(err => console.log(err))
  }

  //ПОИСК ФИЛЬМОВ

  //Фильтрация по названию
  function filterMoviesByTitle(movies, request) {
    return movies.filter(function(movie) {
      return movie.nameRU.toLowerCase().indexOf(request.toLowerCase()) > -1
        || (movie.nameEN && movie.nameEN.toLowerCase().indexOf(request.toLowerCase()) > -1)
    })
  }

  //Проверка по длительности
  function handleDurationFiltration(movies) {
    return movies.filter(movie => {
      return movie.duration <= shortMovieDuration;
    });

  }

  //Фильтрация по длительности
  function handleCheckboxToggle(isShortMoviesOn) {
    const movies = JSON.parse(localStorage.getItem('movies'));

    if (isShortMoviesOn) {
      let filteredData = handleDurationFiltration(movies);
      setFilteredMovies(filteredData);
    } else {
      setFilteredMovies(movies);
    }
  }

  function handleCheckboxToggleInSaved(isShortMoviesOn) {
    const movies = JSON.parse(localStorage.getItem('moviesInSavedByName'));

    if (isShortMoviesOn) {
      let filteredData = handleDurationFiltration(movies);
      setFilteredSavedMovies(filteredData);
    } else {
      setFilteredSavedMovies(movies);
    }
  }

  //
  function handleMovieSearch(movies, request, isShortMovieChecked) {
    let filteredData = [];
    filteredData = filterMoviesByTitle(movies, request);
    localStorage.setItem('movies', JSON.stringify(filteredData));
    if (isShortMovieChecked) {
      filteredData = handleDurationFiltration(filteredData);
    };
    return filteredData;
  }

  function handleSavedMovieSearch(movies, request, isShortMovieChecked) {
    let filteredData = [];
    filteredData = filterMoviesByTitle(movies, request);
    localStorage.setItem('moviesInSavedByName', JSON.stringify(filteredData));
    if (isShortMovieChecked) {
      filteredData = handleDurationFiltration(filteredData);
    };
    return filteredData;
  }

  //Поиск по введеному запросу
  const searchPromise = (request) => {
    return new Promise((resolve, reject) => {
      if (beatfilmMovies.length === 0) {
        moviesApi.getMovies()
          .then((res) => {
            setBeatfilmMovies(res);
            localStorage.setItem('beatfilmMovies', JSON.stringify(res));
            resolve(handleMovieSearch(res, request, isShortMovieChecked))
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
      }
      else {
        resolve(handleMovieSearch(beatfilmMovies, request, isShortMovieChecked));
      }
    })
  }

  const savedSearchPromise = (req) => {
    return new Promise((resolve) => {
      resolve(handleSavedMovieSearch(savedMovies, req, isShortInSavedChecked))
    })
  }

  //чекбокс фильтрации короткометражек
  function handleCheckboxClick(e) {
    setIsShortMovieChecked(e.target.checked);
    handleCheckboxToggle(e.target.checked);
  }

  function handleCheckboxClickInSaved(e) {
    setIsShortInSavedChecked(e.target.checked);
    handleCheckboxToggleInSaved(e.target.checked);
  }

  //Обработчик формы поиска
  function handleSearch(request) {
    setIsLoading(true)
    setRequest(request);
    searchPromise(request)
      .then(res => {
        setFilteredMovies(res)
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
  }

  function handleSearchInSavedMovies(req) {
    setIsLoading(true);
    savedSearchPromise(req)
      .then(res => {
        setFilteredSavedMovies(res)
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
  }

  //Сохранение фильма
  function handleMovieSaving(movie) {
    setIsLoading(true);
    const isSaved = savedMovies.some(m => m.movieId === movie.id);
    if (!isSaved) {
      mainApi.saveMovie(movie)
        .then(res => {
          setFilteredMovies(movies => movies.map(m => m.id === res.movieId ? res : m));
          const updatedSavedMovies = [res, ...savedMovies];
          setSavedMovies(updatedSavedMovies);
          localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies))
        })
        .catch(err => console.log(err))
        .finally(setIsLoading(false))
    }
  }

  //Удаление фильма
  function handleMovieDelete(movie) {
    setIsLoading(true);
    mainApi.deleteMovie(movie._id)
      .then(deletedMovie => {
        const updatedSavedMovies = savedMovies.filter(m => m._id !== deletedMovie._id);
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
        setSavedMovies(updatedSavedMovies);

        setFilteredMovies(movies => movies.map(m => m._id && m._id === movie._id ? beatfilmMovies.find(m => m.id === movie.movieId) : m));
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
  }

  //состояние выпадающего меню
  function handleMenuState() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          loggedIn={loggedIn}
          isBurgerMenuOpen={isBurgerMenuOpen}
          handleMenuState={handleMenuState}
        />

        <Routes>
          <Route path='/' element={<Main />} />

          <Route path='/signin' element={<Login handleLogin={handleLogin} />} />

          <Route path='/signup' element={<Register handleRegister={handleRegister} />} />

          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path='/movies'
              element={<Movies
                handleMovieSearch={handleSearch}
                movies={filteredMovies}
                savedMovies={savedMovies}
                isShortMovieChecked={isShortMovieChecked}
                handleCheckboxClick={handleCheckboxClick}
                isLoading={isLoading}
                handleMovieSaving={handleMovieSaving}
                handleMovieDelete={handleMovieDelete}
                request={request}/>} />

            <Route
              path='/saved-movies'
              element={<SavedMovies
                savedMovies={savedMovies}
                handleMovieDelete={handleMovieDelete}
                handleMovieSearch={handleSearchInSavedMovies}
                handleCheckboxClick={handleCheckboxClickInSaved}
                isShortMovieChecked={isShortInSavedChecked}
              />} />

            <Route
              path='/profile'
              element={<Profile
                handleLogOut={handleLogOut}
                userInfo={currentUser}
                handleUpdateProfile={handleUpdateProfile}/>}
            />
          </Route>

          <Route path='/*' element={<NotFoundPage />} />
        </Routes>

        <Footer />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
