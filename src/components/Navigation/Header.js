import React, { useState, useEffect, useRef, Fragment } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
  IoArrowForwardCircle,
  IoArrowDownCircleOutline,
} from "react-icons/io5";

import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import { useSearchContext } from "../../context/SearchContext";
import { useDataContext } from "../../context/DataContext";
import ProfileImage from "../../Assets/profilepic.png";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function Header() {
  const [searchResponsive, setSearchResponsive] = useState(true);
  const { user, logOut } = useUserAuth();
  const { searchHandler, setCategory } = useSearchContext();
  const { userdata } = useDataContext();
  const [inputValue, setInputValue] = useState("");
  const [nav, setNav] = useState(true);
  const [userMenu, setUserMenu] = useState(true);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleNav = () => {
    setNav(!nav);
  };

  const userMenuHandler = () => {
    setUserMenu(!userMenu);
  };

  let inputRef = useRef();
  let userButtonRef = useRef();

  const searchResponsiveHandler = () => {
    setSearchResponsive((prev) => !prev);
  };

  useEffect(() => {
    let handler = (event) => {
      if (!inputRef.current.contains(event.target)) {
        setSearchResponsive(true);
      }
    };
    document.addEventListener("mousedown", handler);
    let handler2 = (event) => {
      if (!userButtonRef.current?.contains(event.target)) {
        setUserMenu(true);
      }
    };
    document.addEventListener("mousedown", handler2);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("mousedown", handler2);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
      setUserMenu(!userMenu);
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
      <div className="bg-white flex h-[100px]  items-center justify-evenly border-b-2  w-full">
        <div
          className={
            !searchResponsive
              ? "hidden"
              : "md:w-[150px] md:flex md:align-center md:justify-center"
          }
          onClick={mainPageClickHandler}
        >
          <Link to="/" className="text-3xl">
            PCMarket
          </Link>
        </div>
        <div
          className={
            searchResponsive ? "hidden md:block md:w-1/2" : "w-[250px] "
          }
        >
          <form ref={inputRef} onSubmit={formSubmit}>
            <label className=" mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              </div>
              <input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className={searchResponsive ? "md:hidden block" : "hidden"}>
          <button
            onClick={searchResponsiveHandler}
            className="md:hidden p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        <div className="flex items-center md:w-[150px] md:flex md:align-center md:justify-center">
          {user && userdata ? (
            <Menu as="div" className="relative inline-block text-left z-20">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  {userdata.firstname}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
            // <div ref={userButtonRef} className="dropdown">
            //   <button
            //     className="flex flex-col justify-center items-center mx-3 text-sm rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            //     onClick={userMenuHandler}
            //   >
            //     <img
            //       class="w-10 h-10 rounded-full"
            //       src={ProfileImage}
            //       alt="user photo"
            //     ></img>
            //     <p className="fixed mt-[60px]">{userdata.firstname}</p>
            //   </button>
            //   <div
            //     id="dropdown"
            //     class={
            //       userMenu
            //         ? "hidden z-10 w-22 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            //         : "z-10 origin-top-right absolute left-0 mt-5 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            //     }
            //   >
            //     <ul
            //       class="py-1 text-sm text-gray-700 dark:text-gray-200 flex flex-col items-center"
            //       aria-labelledby="multiLevelDropdownButton"
            //     >
            //       <li>
            //         <Link
            //           onClick={() => {
            //             setUserMenu(!userMenu);
            //           }}
            //           to="/additem"
            //           class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            //         >
            //           Add Item
            //         </Link>
            //       </li>

            //       <li>
            //         <Link
            //           onClick={() => {
            //             setUserMenu(!userMenu);
            //           }}
            //           to="/myproducts"
            //           class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            //         >
            //           My Products
            //         </Link>
            //       </li>
            //       <li>
            //         <Link
            //           onClick={handleLogOut}
            //           to="/login"
            //           class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            //         >
            //           Logout
            //         </Link>
            //       </li>
            //     </ul>
            //   </div>

            // </div>

            <div className="flex">
              <Link
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="">
        <div className="hidden md:flex h-[50px] w-full justify-center items-center">
          <p
            onClick={(e) => {
              setCategory("PC");
            }}
            className="p-4"
          >
            PC
          </p>
          <p
            onClick={(e) => {
              setCategory("Components");
            }}
            className="p-4"
          >
            Components
          </p>
          <p
            onClick={(e) => {
              setCategory("Laptops");
            }}
            className="p-4"
          >
            Laptops
          </p>
          <p
            onClick={(e) => {
              setCategory("Consoles");
            }}
            className="p-4"
          >
            Consoles
          </p>
          <p
            onClick={(e) => {
              setCategory("Monitors");
            }}
            className="p-4"
          >
            Monitors
          </p>
          <p
            onClick={(e) => {
              setCategory("Peripherals");
            }}
            className="p-4"
          >
            Peripherals
          </p>
          <p
            onClick={(e) => {
              setCategory("Accessories");
            }}
            className="p-4"
          >
            Accessories
          </p>
        </div>
        <div className="flex md:hidden h-[50px] w-full justify-end items-center p-1">
          <div
            onClick={handleNav}
            className=" flex flex-row border-2 rounded-lg w-[180px] justify-center"
          >
            <p className="text-lg mr-1 font-semibold">Categories</p>
            <AiOutlineMenu size={30} />
          </div>
        </div>
        <div
          className={
            !nav
              ? "fixed left-0 top-0 w-[100%] border-r bg-white border-r-gray-900 h-full z-50"
              : "hidden"
          }
        >
          <div className="flex flex-col items-center">
            <div className="flex justify-between border-b-2 w-[100%]">
              <h3 className="p-4">Categories</h3>
              <div onClick={handleNav} className="p-4">
                <AiOutlineClose size={30} className="" />
              </div>
            </div>
            <ul className="flex flex-col w-[80%] h-full ">
              <li className="border-b-2 p-5 flex justify-between">
                <button className="w-[80%] flex justify-between items-center">
                  <p>PC</p>
                  <IoArrowDownCircleOutline size={25} />
                </button>
                <button>
                  <IoArrowForwardCircle size={25} />
                </button>
              </li>
              <li className="border-b-2 p-5 flex justify-between">
                <button className="w-[80%] flex justify-between items-center">
                  <p>Components</p>
                  <IoArrowDownCircleOutline size={25} />
                </button>
                <button>
                  <IoArrowForwardCircle size={25} />
                </button>
              </li>
              <li className="border-b-2 p-5 flex justify-between">
                <button className="w-[80%] flex justify-between items-center">
                  <p>Laptops</p>
                  <IoArrowDownCircleOutline size={25} />
                </button>
                <button>
                  <IoArrowForwardCircle size={25} />
                </button>
              </li>
              <li className="border-b-2 p-5 flex justify-between">
                <button className="w-[80%] flex justify-between items-center">
                  <p>Consoles</p>
                  <IoArrowDownCircleOutline size={25} />
                </button>
                <button>
                  <IoArrowForwardCircle size={25} />
                </button>
              </li>
              <li className="border-b-2 p-5 flex justify-between">
                <button className="w-[80%] flex justify-between items-center">
                  <p>Monitors</p>
                  <IoArrowDownCircleOutline size={25} />
                </button>
                <button>
                  <IoArrowForwardCircle size={25} />
                </button>
              </li>
              <li className="border-b-2 p-5 flex justify-between">
                <button className="w-[80%] flex justify-between items-center">
                  <p>Peripherals</p>
                  <IoArrowDownCircleOutline size={25} />
                </button>
                <button>
                  <IoArrowForwardCircle size={25} />
                </button>
              </li>
              <li className="border-b-2 p-5 flex justify-between">
                <button className="w-[80%] flex justify-between items-center">
                  <p>Accessories</p>
                  <IoArrowDownCircleOutline size={25} />
                </button>
                <button>
                  <IoArrowForwardCircle size={25} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Header;
