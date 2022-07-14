import React from "react";
import { useDataContext } from "../../context/DataContext";

function Contact() {
  const { inputValue, setInputValue, changeHandler, writeToDatabase } =
    useDataContext();

  const inputHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <p>{inputValue}</p>

      <input value={inputValue} onChange={inputHandler}></input>
      <button onClick={changeHandler}>click here</button>
    </div>
  );
}

export default Contact;
