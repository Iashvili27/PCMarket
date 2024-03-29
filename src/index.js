import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { DataContextProvider } from "./context/DataContext";
import { SearchContextProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserAuthContextProvider>
    <DataContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </DataContextProvider>
  </UserAuthContextProvider>
);
