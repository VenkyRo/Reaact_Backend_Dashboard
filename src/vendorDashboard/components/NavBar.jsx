import React from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogout,
  logoutHandler
}) => {

  const firmName = localStorage.getItem('firmName');
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            src="/src/img/suby.png"
            alt="Royal Suby Logo"
            className="logo-img"
          />
          <span>RoyalSuby</span>
        </div>
        <div className="firmName">
          Welcome:{firmName}
        </div>
        <ul className="nav-links">
          {!showLogout ? (
            <>
              <li>
                <span onClick={showLoginHandler}>Login</span>
              </li>
              <li>
                <span onClick={showRegisterHandler}>Register</span>
              </li>
            </>
          ) : (
            <li>
              <span onClick={logoutHandler}>Logout</span>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
