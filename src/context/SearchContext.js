import { createContext, useContext, useState } from "react";

const searchContext = createContext();

export function SearchContextProvider({ children }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const searchHandler = (value) => {
    setSearch(value);
  };

  return (
    <searchContext.Provider
      value={{ search, category, setSearch, searchHandler, setCategory }}
    >
      {children}
    </searchContext.Provider>
  );
}

export function useSearchContext() {
  return useContext(searchContext);
}
