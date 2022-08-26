import React, { useState, useEffect, useRef } from "react";
import { useSearchContext } from "../../context/SearchContext";

function Search({ searchResponsive, setSearchResponsive }) {
  const [inputValue, setInputValue] = useState("");
  const { searchHandler, setCategory } = useSearchContext();
  let inputRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!inputRef.current.contains(event.target)) {
        setSearchResponsive(true);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const formSubmit = (event) => {
    event.preventDefault();
    searchHandler(inputValue);
  };

  return (
    <>
      <div
        className={
          searchResponsive
            ? "hidden xl:flex xl:w-[50%]"
            : "w-[70%]  ease-in-out duration-500"
        }
      >
        <form
          className="w-full transition"
          ref={inputRef}
          onSubmit={formSubmit}
        >
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
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none	 border-gray-300"
              placeholder="Search PC's, Laptop's..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
