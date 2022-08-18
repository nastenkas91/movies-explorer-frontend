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
import { filterMoviesByTitle, handleDurationFiltration } from '../../utils/utils';
import {useLocation} from "react-router";
import {
  amountOfCards1280,
  amountOfCards768,
  amountOfCards480,
  newRow1280,
  newRow768,
  newRow480,
  successMessage,
  profileUpdateErrorMessage,
  conflictingEmailMessage,
  registrationErrorMessage,
  authErrorMessage,
  commonErrorMessage
} from "../../utils/constants";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shownSavedMovies, setShownSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [amountOfCards, setAmountOfCards] = useState(0);
  const [rowLength, setRowLength] = useState(0);

  //состояние попапов и сообщений
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({isOpen: false, text: '', success: false });
  const [nothingFound, setNothingFound] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', checkWindowSize);
    return () => window.removeEventListener('resize', checkWindowSize);
  }, )

  useEffect(() => {
    checkToken();
    if (localStorage.getItem('beatfilmMovies')) {
      setBeatfilmMovies(JSON.parse(localStorage.getItem('beatfilmMovies')));
    }
  }, [])

  //проверка токена
  function checkToken() {
    const token = localStorage.getItem('jwt');
    const pathname = location.pathname;
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(pathname);
          } else if (res.message) {
            return res.message
          }
        })
    } else {
      return;
    }
  }

  //получение данных пользователя
  useEffect(() => {
    if(loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(res => {
          setCurrentUser(res[0]);
          setSavedMovies(res[1]);
          setShownSavedMovies(res[1])
          localStorage.setItem('savedMovies', JSON.stringify(res[1]));
          localStorage.setItem('moviesOnSaved', JSON.stringify(res[1]));
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
        if (err === 'Ошибка: 409') {
          setInfoTooltip({isOpen: true, text: conflictingEmailMessage, success: false});
          console.log(err)
        }
        else {
          setInfoTooltip({isOpen: true, text: registrationErrorMessage, success: false});
          console.log(err)
        }
      })
  }

  //авторизация
  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          setInfoTooltip({isOpen: true, text: authErrorMessage, success: false});
          console.log(err)
        }
        else {
          setInfoTooltip({isOpen: true, text: registrationErrorMessage, success: false});
          console.log(err)
        }
      })
      .finally(setIsLoading(false))
  }

  //выход из аккаунта
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
  }

  //обновление профиля
  function handleUpdateProfile({ name, email }) {
    mainApi.editProfileInfo({ name: name, email: email })
      .then((res) => {
        if (res) {
          setCurrentUser({name: res.name, email: res.email});
          setInfoTooltip({isOpen: true, text: successMessage, success: true})
        }

      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setInfoTooltip({isOpen: true, text: conflictingEmailMessage, success: false});
          console.log(err)
        }
        else {
          setInfoTooltip({isOpen: true, text: profileUpdateErrorMessage, success: false});
          console.log(err)
        }
      })
  }

  //ПОИСК ФИЛЬМОВ
  //Поиск по введеному запросу
  function handleMovieSearch(movies, request, isShortMovieChecked, localStorageName) {
    let filteredData = filterMoviesByTitle(movies, request);
    localStorage.setItem(`${localStorageName}`, JSON.stringify(filteredData));
    if (isShortMovieChecked) {
      filteredData = handleDurationFiltration(filteredData);
    };
    return filteredData;
  }

  //Промис приска на странице movies
  const searchPromise = (request, isShortMovieChecked) => {
    return new Promise((resolve, reject) => {
      if (beatfilmMovies.length === 0) {
        moviesApi.getMovies()
          .then((res) => {
            setBeatfilmMovies(res);
            localStorage.setItem('beatfilmMovies', JSON.stringify(res));
            resolve(handleMovieSearch(res, request, isShortMovieChecked, 'movies'))
          })
          .catch(err => {
            console.log(err);
            reject(err);
          })
      }
      else {
        resolve(handleMovieSearch(beatfilmMovies, request, isShortMovieChecked, 'movies'));
      }
    })
  }

  //Обработчик формы поиска по всем фильмам
  function handleSearch(request, isShortMovieChecked) {
    setIsLoading(true)
    checkWindowSize();
    searchPromise(request, isShortMovieChecked)
      .then(res => {
        setFilteredMovies(res);
        localStorage.setItem('filteredMovies', JSON.stringify(res));
        if (res.length > 0) {
          setNothingFound(false);
        }
        else {
          setNothingFound(true);
        }
      })
      .catch(err => {
        console.log(err);
        setInfoTooltip({isOpen: true, text: commonErrorMessage, success: false});
      })
      .finally(setIsLoading(false))
  }

  //Обработчик формы поиска по сохраненным фильмам
  function handleSearchInSavedMovies(req, isShortMovieChecked) {
    const filteredData = handleMovieSearch(savedMovies, req, isShortMovieChecked, 'moviesOnSaved');
    setShownSavedMovies(filteredData);
    if (filteredData.length > 0) {
      setNothingFound(false);
    }
    else {
      setNothingFound(true);
    }
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
          setShownSavedMovies(updatedSavedMovies);
          localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies))
        })
        .catch(err => {
          console.log(err);
          setInfoTooltip({isOpen: true, text: commonErrorMessage, success: false});
        })
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
        setShownSavedMovies(updatedSavedMovies);
        setFilteredMovies(movies => movies.map(m => m._id && m._id === movie._id ? beatfilmMovies.find(m => m.id === movie.movieId) : m));
      })
      .catch(err => {
        console.log(err);
        setInfoTooltip({isOpen: true, text: commonErrorMessage, success: false});
      })
      .finally(setIsLoading(false))
  }

  //состояние выпадающего меню
  function handleMenuState() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  //Проверка ширины экрана
  function checkWindowSize() {
    if (window.innerWidth > 1100) {
      setAmountOfCards(amountOfCards1280);
      setRowLength(newRow1280);
    }
    if (window.innerWidth <= 1100 && window.innerWidth > 700) {
      setAmountOfCards(amountOfCards768);
      setRowLength(newRow768);
    }
    if (window.innerWidth <= 700) {
      setAmountOfCards(amountOfCards480);
      setRowLength(newRow480);
    }
  }


  //Закрытие попапа с сообщением
  function closeTooltip() {
    setInfoTooltip({isOpen: false, text: '', success: infoTooltip.success});
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
                filteredMovies={filteredMovies}
                setFilteredMovies={setFilteredMovies}
                checkWindowSize={checkWindowSize}
                amountOfCards={amountOfCards}
                setAmountOfCards={setAmountOfCards}
                rowLength={rowLength}
                isLoading={isLoading}
                handleMovieSaving={handleMovieSaving}
                handleMovieDelete={handleMovieDelete}
                nothingFound={nothingFound}/>} />

            <Route
              path='/saved-movies'
              element={<SavedMovies
                savedMovies={savedMovies}
                shownSavedMovies={shownSavedMovies}
                setShownSavedMovies={setShownSavedMovies}
                handleMovieDelete={handleMovieDelete}
                handleMovieSearch={handleSearchInSavedMovies}
                nothingFound={nothingFound}
                checkWindowSize={checkWindowSize}
              />} />

            <Route
              path='/profile'
              element={<Profile
                handleLogOut={handleLogOut}
                handleUpdateProfile={handleUpdateProfile} />}
            />
          </Route>

          <Route path='/*' element={<NotFoundPage />} />
        </Routes>

        <Footer />

        <InfoTooltip infoTooltip={infoTooltip} onClose={closeTooltip} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
