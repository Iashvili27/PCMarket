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
  onSnapshot,
  collectionGroup,
  limit,
} from "firebase/firestore";
import {
  ref as storageref,
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
  const [imageUpload, setImageUpload] = useState(null);
  const [imageuploaddone, setImageUploadDone] = useState("");
  // Data for Users and Items
  const [items, setItems] = useState([]);
  const [userdata, setUserData] = useState([]);

  const userUid = user ? user.uid : null;

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

  const writeToDatabase = () => {
    const uuid = uid();
    const docRef = doc(storedb, "users", user.email);
    const colRef = collection(docRef, "items");
    addDoc(colRef, {
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

  console.log(userdata);

  useEffect(() => {
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      const docSnap = getDoc(docRef).then((doc) => {
        setUserData(doc.data());
      });
    }

    // const useremailref = collection(storedb, "users");
    // const q = query(
    //   useremailref,
    //   where("email", "==", "iashviligiorgi3@gmail.com")
    // );
    // const getquery = getDocs(q).then((collection) => {
    //   console.log(collection.docs.map((doc) => doc.data()));
    // });

    const useremailref = collection(storedb, "items");
    const q = query(useremailref, where("title", "==", "laptop"));
    const getquery = getDocs(q).then((collection) => {
      console.log(collection.docs.map((doc) => doc.data()));
    });

    // const filterItems = collectionGroup(storedb, "items");
    // const filterData = query(filterItems, where("title", "==", "pc"));
    // const getFilteredData = getDocs(filterData).then((collection) => {
    //   console.log(collection.docs.map((doc) => doc.data()));
    // });

    const itemsCollection = collectionGroup(storedb, "items");
    const data = getDocs(itemsCollection).then((collection) => {
      setItems(collection.docs.map((doc) => doc.data()));
    });
  }, [user]);

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
