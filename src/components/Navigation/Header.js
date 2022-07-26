import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useSearchContext } from "../../context/SearchContext";
import { useDataContext } from "../../context/DataContext";

function Header() {
  const { user, logOut } = useUserAuth();
  const { searchHandler, setCategory } = useSearchContext();
  const { userdata } = useDataContext();
  const [inputValue, setInputValue] = useState("");

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  const mainPageClickHandler = () => {
    setCategory("");
    searchHandler("");
    setInputValue("");
  };

  const formSubmit = (event) => {
    event.preventDefault();
    searchHandler(inputValue);
  };

  return (
    <Fragment>
      <div className="header__container">
        <div onClick={mainPageClickHandler} className="header__name">
          <Link to="/" className="header__text">
            PCMarket
          </Link>
        </div>
        <form className="header__search" onSubmit={formSubmit}>
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="header__inp"
          />
          <button type="submit">
            <SearchIcon className="header__icon" />
          </button>
        </form>
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

          {user && userdata ? (
            <li>
              <div className="dropdown">
                <p className="header__navlinkuser">{userdata.firstname}</p>
                <p className="header__navlink">{userdata.firstname}</p>
                <div className="dropdown-content">
                  <Link className="header__navl" to="/additem">
                    Add Item +
                  </Link>
                  <Link className="header__navl" to="/myproducts">
                    My Products
                  </Link>
                  <Link
                    onClick={handleLogOut}
                    className="header__navl"
                    to="/login"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </li>
          ) : (
            <li>
              <Link className="header__navlinklogin" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="header__navigation">
        <p
          onClick={(e) => {
            setCategory("PC");
          }}
          className="header__navbuttons"
        >
          PC
        </p>
        <p
          onClick={(e) => {
            setCategory("Components");
          }}
          className="header__navbuttons"
        >
          Components
        </p>
        <p
          onClick={(e) => {
            setCategory("Laptops");
          }}
          className="header__navbuttons"
        >
          Laptops
        </p>
        <p
          onClick={(e) => {
            setCategory("Consoles");
          }}
          className="header__navbuttons"
        >
          Consoles
        </p>
        <p
          onClick={(e) => {
            setCategory("Monitors");
          }}
          className="header__navbuttons"
        >
          Monitors
        </p>
        <p
          onClick={(e) => {
            setCategory("Peripherals");
          }}
          className="header__navbuttons"
        >
          Peripherals
        </p>
        <p
          onClick={(e) => {
            setCategory("Accessories");
          }}
          className="header__navbuttons"
        >
          Accessories
        </p>
      </div>
    </Fragment>
  );
}

export default Header;
