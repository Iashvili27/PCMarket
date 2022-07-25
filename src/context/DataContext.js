import { createContext, useContext, useEffect, useState } from "react";
import { storage, storedb } from "../firebase";
import { uid } from "uid";
import {
  doc,
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
  deleteObject,
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
  const [useritems, setUserItems] = useState([]);
  const [uuid, setUuid] = useState(uid());
  const userUid = user ? user.uid : null;
  // States for modal
  const [itemdeletedsucecsfully, setItemDeletedSuccesfully] = useState(false);

  // User uploads image in Database
  const uploadImage = async () => {
    try {
      if (imageUpload == null) return;
      const imageRef = storageref(
        storage,
        `images/${uuid}`
        // + ${imageUpload.name}
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

  // User Adds Item In Database
  const writeToDatabase = () => {
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
    setUuid(uid());
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

  // User Deletes Item From Database

  const deleteItemFromDatabase = (item) => {
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      const getCol = collection(docRef, "items");
      const q = query(getCol, where("uuid", "==", item));
      getDocs(q)
        .then((collection) => {
          collection.docs.forEach((doc) => deleteDoc(doc.ref));
          setItemDeletedSuccesfully(true);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });

      // Delete the Image
      const desertRef = storageref(storage, `images/${item}`);
      deleteObject(desertRef)
        .then(() => {
          // File deleted successfully
          setItemDeletedSuccesfully(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    //Get User Items
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      const getCol = collection(docRef, "items");
      getDocs(getCol)
        .then((collection) => {
          setUserItems(collection.docs.map((doc) => doc.data()));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    //Get Current User Data
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      getDoc(docRef)
        .then((doc) => {
          setUserData(doc.data());
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Get All items for Main Page
    const itemsCollection = collectionGroup(storedb, "items");
    getDocs(itemsCollection)
      .then((collection) => {
        setItems(collection.docs.map((doc) => doc.data()));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

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
        itemdeletedsucecsfully,
        setItemDeletedSuccesfully,
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
