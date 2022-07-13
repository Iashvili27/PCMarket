import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function Header() {
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      {console.log(user)}
      <div className="header__container">
        <div className="header__name">
          <Link to="/" className="header__text">
            PCMarket
          </Link>
        </div>
        <div className="header__search">
          <input className="header__inp" />
          <SearchIcon className="header__icon" />
        </div>
        <ul className="header__nav">
          <li>
            <Link className="header__navlink" to="/">
              Home Page
            </Link>
          </li>

          <li>
            <Link className="header__navlink" to="/contact">
              Contact
            </Link>
          </li>
          {user ? (
            <li>
              <Link
                onClick={handleLogOut}
                className="header__navlink"
                to="/login"
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link className="header__navlink" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="header__navigation">
        <p className="header__navbuttons">PC</p>
        <p className="header__navbuttons">Components</p>
        <p className="header__navbuttons">Laptops</p>
        <p className="header__navbuttons">Consoles</p>
        <p className="header__navbuttons">Monitors</p>
        <p className="header__navbuttons">Peripherals</p>
        <p className="header__navbuttons">Accessories</p>
      </div>
    </Fragment>
  );
}

export default Header;
