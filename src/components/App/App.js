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
  successMessage, profileUpdateErrorMessage, conflictingEmailMessage, registrationErrorMessage, authErrorMessage
} from "../../utils/constants";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [beatfilmMovies, setBeatfilmMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shownSavedMovies, setShownSavedMovies] = useState([]);

  const [isShortMovieChecked, setIsShortMovieChecked] = useState(false);
  const [isSavedShortMovieChecked, setIsSavedShortMovieChecked] = useState(false);

  const [request, setRequest] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [amountOfCards, setAmountOfCards] = useState(0);
  const [rowLength, setRowLength] = useState(0);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);

  //состояние попапов
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({isOpen: false, text: '', success: false });
  const [nothingFound, setNothingFound] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', checkWindowSize);
    return () => window.removeEventListener('resize', checkWindowSize);
  })

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

  //
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
  }

  //выход из аккаунта
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    setBeatfilmMovies([]);
    setFilteredMovies([]);
    setSavedMovies([]);
    setShownSavedMovies([]);
  }

  //обновление профиля
  function handleUpdateProfile({ name, email }) {
    mainApi.editProfileInfo({ name: name, email: email })
      .then((res) => {
        if (res.message) {
          console.log(res.message)
        }

        else if (res) {
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

  //Фильтрация по длительности
  function handleCheckboxToggle(isShortMoviesOn, localStorageName) {
    const movies = JSON.parse(localStorage.getItem(`${localStorageName}`));

    if (isShortMoviesOn) {
      let filteredData = handleDurationFiltration(movies);
      if (location.pathname === '/movies') {
        setFilteredMovies(filteredData);
        if (filteredData.length === 0) {
          setIsMoreButtonVisible(false);
        }
      } else if (location.pathname === '/saved-movies') {
        setShownSavedMovies(filteredData)
      }
    } else {
      if (location.pathname === '/movies') {
        setFilteredMovies(movies);
      } else if (location.pathname === '/saved-movies') {
        setShownSavedMovies(movies)
      }
    }
  }

  //нажатие на чекбокс
  function handleCheckboxClick(e) {
    setIsShortMovieChecked(e.target.checked);
    handleCheckboxToggle(e.target.checked, 'movies');
  }

  function handleSavedCheckboxClick(e) {
    setIsSavedShortMovieChecked(e.target.checked);
    handleCheckboxToggle(e.target.checked, 'moviesOnSaved');
  }

  //
  function handleMovieSearch(movies, request, isShortMovieChecked, localStorageName) {
    let filteredData = [];
    filteredData = filterMoviesByTitle(movies, request);
    localStorage.setItem(`${localStorageName}`, JSON.stringify(filteredData));
    if (isShortMovieChecked) {
      filteredData = handleDurationFiltration(filteredData);
    };
    return filteredData;
  }

  //Поиск по введеному запросу
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

  //Обработчик формы поиска
  function handleSearch(request, isShortMovieChecked) {
    setIsLoading(true)
    setRequest(request);
    checkWindowSize();
    searchPromise(request, isShortMovieChecked)
      .then(res => {
        setFilteredMovies(res);
        if (res.length > 0) {
          setNothingFound(false);
          setIsMoreButtonVisible(res.length > amountOfCards);
        }
        else {
          setNothingFound(true);
          setIsMoreButtonVisible(false);
        }
      })
      .catch(err => console.log(err))
      .finally(setIsLoading(false))
  }

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
        setShownSavedMovies(updatedSavedMovies);
        setFilteredMovies(movies => movies.map(m => m._id && m._id === movie._id ? beatfilmMovies.find(m => m.id === movie.movieId) : m));
      })
      .catch(err => console.log(err))
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
    setIsMoreButtonVisible(filteredMovies.length > amountOfCards);
  }

  //кнопка "Еще"
  function handleMoreButtonClick() {
    const newAmountOfCards = amountOfCards + rowLength;
    setAmountOfCards(newAmountOfCards);
    if (filteredMovies.length <= newAmountOfCards) {
      setIsMoreButtonVisible(false)
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
                movies={filteredMovies}
                savedMovies={savedMovies}
                amountOfCards={amountOfCards}
                handleCheckboxClick={handleCheckboxClick}
                isShortMovieChecked={isShortMovieChecked}
                isLoading={isLoading}
                handleMovieSaving={handleMovieSaving}
                handleMovieDelete={handleMovieDelete}
                isMoreButtonVisible={isMoreButtonVisible}
                handleMoreButtonClick={handleMoreButtonClick}
                nothingFound={nothingFound}
                request={request}/>} />

            <Route
              path='/saved-movies'
              element={<SavedMovies
                savedMovies={savedMovies}
                shownSavedMovies={shownSavedMovies}
                handleMovieDelete={handleMovieDelete}
                handleCheckboxClick={handleSavedCheckboxClick}
                handleMovieSearch={handleSearchInSavedMovies}
                handleCheckboxToggle={handleCheckboxToggle}
                isShortMovieChecked={isSavedShortMovieChecked}
                nothingFound={nothingFound}
              />} />

            <Route
              path='/profile'
              element={<Profile
                handleLogOut={handleLogOut}
                handleUpdateProfile={handleUpdateProfile}/>}
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
