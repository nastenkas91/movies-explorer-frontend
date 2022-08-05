import React from "react";
import './App.css';
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage"
import {Route, Routes} from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <div className="app">
      <Header loggedIn={true} />

      <Routes>
        <Route path='/' element={<Main />} />

        <Route path='/movies' element={<Movies />} />

        <Route path='/saved-movies' element={<SavedMovies />} />

        <Route path='/profile' element={<Profile />} />

        <Route path='/signin' element={<Login />} />

        <Route path='/signup' element={<Register />} />

        <Route path='/*' element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
