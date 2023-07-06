import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { LogIn } from "./logIn";
import { SignUp } from "./signUp";
import "../../../front/styles/index.css";

export const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setLoginSuccess(false);
  };

  const handleSignupClick = () => {
    setShowSignupForm(true);
  };

  const handleLogoutClick = () => {
    actions.logout();
    setLogoutSuccess(true);
    setTimeout(() => {
      setLogoutSuccess(false);
      navigate("/");
    }, 1000);
  };

  const handleLoginFormClose = () => {
    setShowLoginForm(false);
    setLoginSuccess(false);
  };

  const handleSignupFormClose = () => {
    setShowSignupForm(false);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLoggedIn = !!store.token; // Assuming the token is stored in the 'token' property of the store

  return (
    <div>
      <nav className="navbar navbar-left">

        <ul className="navbar-nav me-auto mb-lg-0">
          <li className="nav-item">
            <Link to="/">
              <a className="nav-link" aria-current="page" href="#">
                Home
              </a>
            </Link>
          </li>
          {!isLoggedIn && isHomePage && (
            <React.Fragment>
              <li className="nav-item">
                <button className="navbar-button" onClick={handleLoginClick}>
                  Log In
                </button>
              </li>
              <li className="nav-item">
                <button className="navbar-button" onClick={handleSignupClick}>
                  Sign Up
                </button>
              </li>
            </React.Fragment>
          )}
        </ul>
        {isLoggedIn && (
          <div className="ml-auto login-out">
            {isHomePage && (
              <React.Fragment>
                <button className="logout-button" onClick={handleLogoutClick}>
                  Log Out
                </button>
                <span className="button-spacing" />
              </React.Fragment>
            )}
            <Link to="/updated-profile">
              <FontAwesomeIcon icon={faUser} className="navbar-icon" />
            </Link>
            <span className="button-spacing" />
            <FontAwesomeIcon icon={faBell} className="navbar-icon" />
          </div>
        )}
      </nav>

      {showLoginForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="login-form">
              {loginSuccess ? (
                <p>Login successful. Closing form...</p>
              ) : (
                <React.Fragment>
                  <h3 className="form-title">Log In</h3>
                  <LogIn onClose={handleLoginFormClose} onSuccess={() => setLoginSuccess(true)} />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}

      {showSignupForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="signup-form">
              <h3 className="form-title">Sign Up</h3>
              <SignUp onClose={handleSignupFormClose} />
            </div>
          </div>
        </div>
      )}

      {logoutSuccess && <div className="logout-message alert alert-success">Logout successful. Redirecting...</div>}
    </div>
  );
};
