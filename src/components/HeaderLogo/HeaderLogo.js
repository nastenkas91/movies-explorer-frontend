import React from "react";
import './HeaderLogo.css';
import headerLogo from "../../images/logo-header.svg";
import {NavLink} from "react-router-dom";

function HeaderLogo() {
  return (
    <NavLink to='/'>
      <img src={headerLogo} alt="главная" className="header-logo" />
    </NavLink>
  )
}

export default HeaderLogo;