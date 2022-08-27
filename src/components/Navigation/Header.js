import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useSearchContext } from "../../context/SearchContext";
import ProfileImage from "../../Assets/profilepic.png";
import { Menu, Transition } from "@headlessui/react";
import Search from "./Search";

function Header() {
  const { user, logOut, userData, setUserData } = useUserAuth();
  const { searchHandler, setCategory } = useSearchContext();
  const [userMenu, setUserMenu] = useState(true);
  const [searchResponsive, setSearchResponsive] = useState(true);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const searchResponsiveHandler = () => {
    setSearchResponsive((prev) => !prev);
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      setUserMenu(!userMenu);
      setUserData([]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const mainPageClickHandler = () => {
    setCategory("");
    searchHandler("");
  };

  return (
    <>
      <div
        className={
          searchResponsive
            ? "flex justify-around h-[80px] bg-gray-800 items-center w-full xl:justify-between xl:px-32"
            : "flex justify-evenly h-[80px] bg-gray-800 items-center w-full xl:justify-between xl:px-32"
        }
      >
        <div
          className={
            searchResponsive
              ? "xl:w-[150px] xl:flex xl:align-center xl:justify-center"
              : "hidden"
          }
          onClick={mainPageClickHandler}
        >
          <Link to="/" className="text-3xl text-white  xl:flex">
            PCMarket
          </Link>
        </div>
        <Search
          searchResponsive={searchResponsive}
          setSearchResponsive={setSearchResponsive}
        />
        <div className="flex items-center xl:w-[150px] xl:flex xl:align-center xl:justify-center">
          <div className={searchResponsive ? "xl:hidden block" : "hidden"}>
            <button
              onClick={searchResponsiveHandler}
              className="xl:hidden p-2.5 text-sm font-medium text-white bg-gray-800 rounded-lg  hover:bg-gray-600   "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
          {user && userData ? (
            <Menu as="div" className="relative inline-block text-left z-20  ">
              <Menu.Button className="inline-flex justify-center w-full  items-center rounded-md shadow-sm px-4 py-2 bg-gray-800 text-white text-sm font-medium  hover:bg-gray-600">
                <img
                  className="w-8 h-8 rounded-full"
                  src={ProfileImage}
                  alt=""
                />
                <p className="ml-2"> {userData.firstname}</p>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          onClick={() => {
                            setUserMenu(!userMenu);
                          }}
                          to="/additem"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Add Item
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          onClick={() => {
                            setUserMenu(!userMenu);
                          }}
                          to="/myproducts"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          My Products
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          onClick={handleLogOut}
                          to="/login"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block w-full text-left px-4 py-2 text-sm"
                          )}
                        >
                          Logout
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex">
              <Link
                className="inline-flex justify-center w-full  items-center rounded-md shadow-sm px-4 py-2 bg-gray-800 text-white text-sm font-medium  hover:bg-gray-600"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
