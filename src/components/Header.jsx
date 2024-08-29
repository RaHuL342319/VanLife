// import React from "react";
import { Link, NavLink } from "react-router-dom";
import avatar from "../assets/images/avatar-icon.png";

const Header = () => {
  function fakeLogOut() {
    localStorage.removeItem("loggedin");
  }
  return (
    <header>
      <Link className="site-logo" to="/">
        #VANLIFE
      </Link>
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/host"
        >
          Host
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : null)}
          to="/vans"
        >
          Vans
        </NavLink>

        <Link to="login" className="login-link">
          <img src={avatar} className="login-icon" />
        </Link>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  );
};

export default Header;
