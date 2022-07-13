import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { DataContextProvider } from "./context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserAuthContextProvider>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </UserAuthContextProvider>
);
