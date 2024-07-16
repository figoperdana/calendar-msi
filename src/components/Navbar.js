import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import '../css/Navbar.css';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const show = menu ? "show" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Calendar App</Link>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={"collapse navbar-collapse " + show}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/events">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calendar">Calendar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/export">Export</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/all-events">All Events</Link>
            </li>
          </ul>
          <div className="navbar-text ml-auto d-flex align-items-center justify-content-center">
            {user ? (
              <>
                <span className="mr-3">Hello, {user.displayName}</span>
                <button className="btn btn-outline-danger" onClick={logOut}>Log Out</button>
              </>
            ) : (
              <Link className="nav-link" to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
