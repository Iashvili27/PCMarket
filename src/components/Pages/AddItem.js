import React from "react";

import { useDataContext } from "../../context/DataContext";

function AddItem() {
  const {
    category,
    setCategory,
    contactnumber,
    setContactNumber,
    description,
    setDescription,
    price,
    setPrice,
    sellername,
    setSellerName,
    title,
    setTitle,
    imageurl,
    setImageUrl,
    changeHandler,
    writeToDatabase,
  } = useDataContext();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <p>{title}</p>
      <input value={title} onChange={titleHandler}></input>
      <button onClick={changeHandler}>click here</button>
    </div>
  );
}

export default AddItem;
