import React, { useState, useEffect } from "react";
import App from "./App";
import Loading from "./Loading";

function Application() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 500);
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <App />
        </>
      )}
    </>
  );
}

export default Application;
