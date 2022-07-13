import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref } from "firebase/database";

const dataContext = createContext();

export function DataContextProvider({ children }) {
  const [inputValue, setInputValue] = useState("");
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), { inputValue, uuid });
    setInputValue("");
  };
  const changeHandler = () => {
    setInputValue(console.log(inputValue));
    writeToDatabase();
  };
  return (
    <dataContext.Provider value={{ inputValue, setInputValue, changeHandler }}>
      {children}
    </dataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(dataContext);
}

// import { useState, createContext, useContext } from "react";

// const dataContext = createContext();

// export function DataContextProvider({ children }) {
//   const data = "1245r1";

//   return (
//     <dataContext.Provider value={{ data }}>{children}</dataContext.Provider>
//   );
// }

// export function useDataContext() {
//   return useContext(dataContext);
// }
