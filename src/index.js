import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Application from "./Application";
import Loading from "./Application";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { DataContextProvider } from "./context/DataContext";
import { SearchContextProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <UserAuthContextProvider>
    <DataContextProvider>
      <SearchContextProvider>
        <Application />
      </SearchContextProvider>
    </DataContextProvider>
  </UserAuthContextProvider>
);
