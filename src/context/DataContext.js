import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue } from "firebase/database";
import {
  ref as storageref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
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
  const [imageUpload, setImageUpload] = useState(null);
  const [items, setItems] = useState([]);
  const [imageuploaddone, setImageUploadDone] = useState("");

  console.log(items);

  const userUid = user ? user.uid : null;

  // const uploadImage = () => {
  //   const uuid = uid();
  //   if (imageUpload == null) return;
  //   const imageRef = storageref(
  //     storage,
  //     `images/${uuid} + ${imageUpload.name}`
  //   );
  //   uploadBytes(imageRef, imageUpload).then((snapshot) => {
  //     console.log("image uploaded");
  //   });
  // };

  const uploadImage = async () => {
    try {
      const uuid = uid();
      if (imageUpload == null) return;
      const imageRef = storageref(
        storage,
        `images/${uuid} + ${imageUpload.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, imageUpload);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progrss function ....
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadDone("Upload is " + progress.toFixed() + "% done");
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUrl(downloadURL);
          });
        }
      );
    } catch (error) {
      throw error;
    }
  };

  console.log(imageuploaddone);

  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, "items/" + [`/${uuid}`]), {
      uuid,
      category,
      contactnumber,
      description,
      price,
      sellername,
      title,
      userUid,
      imageurl,
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
        setItems(Object.values(data.items));
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
        setImageUpload,
        uploadImage,
        setImageUploadDone,
        imageuploaddone,
        imageUpload,
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
