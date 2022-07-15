import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue } from "firebase/database";
import { useUserAuth } from "./UserAuthContext";

const dataContext = createContext();

export function DataContextProvider({ children }) {
  const { user } = useUserAuth();
  const [category, setCategory] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sellername, setSellerName] = useState("");
  const [title, setTitle] = useState("");
  const [imageurl, setImageUrl] = useState("");
  // const [useruid, setUserUid] = useState("");
  const [items, setItems] = useState([]);

  const userUid = user ? user.uid : null;

  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      uuid,
      category,
      contactnumber,
      description,
      price,
      sellername,
      title,
      imageurl,
      userUid,
    });
    setTitle("");
    setCategory("");
    setContactNumber("");
    setDescription("");
    setPrice("");
    setSellerName("");
    setImageUrl("");
  };

  const changeHandler = () => {
    writeToDatabase();
  };
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        // Object.values(data).map((item) =>
        //   setItems((prevItems) => [item, ...prevItems])
        // );
        setItems(Object.values(data));
      }
    });
  }, []);
  return (
    <dataContext.Provider
      value={{
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
        items,
      }}
    >
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
