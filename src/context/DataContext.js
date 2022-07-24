import { createContext, useContext, useEffect, useState } from "react";
import { db, storage, storedb } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue } from "firebase/database";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  collectionGroup,
} from "firebase/firestore";
import {
  ref as storageref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useUserAuth } from "./UserAuthContext";
import { ContentPasteGoOutlined } from "@mui/icons-material";

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
  const [imageUpload, setImageUpload] = useState(null);
  const [imageuploaddone, setImageUploadDone] = useState("");
  // Data for Users and Items
  const [items, setItems] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [useritems, setUserItems] = useState([]);
  const userUid = user ? user.uid : null;

  // User uploads image in Database
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

  // Date when user added item
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const itemDate = new Date();
  const itemDateDay = itemDate.getDate();
  const itemDateMonth = months[itemDate.getMonth()];
  const date = `${itemDateDay}/${itemDateMonth}`;
  //

  // User adds item in database
  const writeToDatabase = () => {
    const uuid = uid();
    const docRef = doc(storedb, "users", user.email);
    const colRef = collection(docRef, "items");
    addDoc(colRef, {
      date: date,
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

  const deleteItemFromDatabase = (item) => {
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      const getCol = collection(docRef, "items");
      const q = query(getCol, where("uuid", "==", item));
      const docSnap = getDocs(q)
        .then((collection) => {
          collection.docs.forEach((doc) => deleteDoc(doc.ref));
          console.log("item deleted");
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  };
  useEffect(() => {
    //Get User Items
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      const getCol = collection(docRef, "items");
      const docSnap = getDocs(getCol).then((collection) => {
        setUserItems(collection.docs.map((doc) => doc.data()));
      });
    }

    //Get Current User Data
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      const docSnap = getDoc(docRef).then((doc) => {
        setUserData(doc.data());
      });
    }

    // Get All items for Main Page
    const itemsCollection = collectionGroup(storedb, "items");
    const data = getDocs(itemsCollection).then((collection) => {
      setItems(collection.docs.map((doc) => doc.data()));
    });
  }, [user, items.length]);

  console.log(items);

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
        userdata,
        useritems,
        deleteItemFromDatabase,
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
