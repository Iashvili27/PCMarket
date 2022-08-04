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
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  ref as storageref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { useUserAuth } from "./UserAuthContext";

const dataContext = createContext();

export function DataContextProvider({ children }) {
  const { user } = useUserAuth();
  const [uploadItemData, setUploadItemData] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  // const [category, setCategory] = useState("");
  // const [contactnumber, setContactNumber] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  // const [sellername, setSellerName] = useState("");
  // const [title, setTitle] = useState("");
  const [imageurl, setImageUrl] = useState("");
  const [imageUpload, setImageUpload] = useState([]);
  const [imageFilesArray, setImageFilesArray] = useState([]);

  const [imageuploaddone, setImageUploadDone] = useState("");
  // Data for Users and Items
  const [items, setItems] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [useritems, setUserItems] = useState([]);
  const [uuid, setUuid] = useState(uid());
  const userUid = user ? user.uid : null;
  // States for modal
  const [itemdeletedsucecsfully, setItemDeletedSuccesfully] = useState(false);
  const [itemAddedSuccesfully, setItemAddedSuccesfully] = useState(false);

  // User uploads image in Database
  console.log(imageFiles);
  const uploadItem = async (values) => {
    const {
      category,
      currency,
      description,
      itemName,
      itemPrice,
      sellerName,
      sellerNumber,
    } = values;
    const docRef = doc(storedb, "users", user.email);
    const colRef = collection(docRef, "items");
    addDoc(colRef, {
      date: date,
      uuid,
      category,
      currency,
      description,
      itemName,
      itemPrice,
      sellerName,
      sellerNumber,
      userUid,
      views: 0,
    })
      .then(() => {
        console.log("item added");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    if (imageFiles.length === 0) return;
    await Promise.all(
      imageFiles.map((image) => {
        const imageRef = storageref(storage, `images/${uuid} + ${image.name}`);
        uploadBytes(imageRef, image).then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          const itemsCollection = collectionGroup(storedb, "items");
          const q = query(itemsCollection, where("uuid", "==", uuid));
          await getDocs(q)
            .then((collection) => {
              collection.docs.forEach((doc) =>
                updateDoc(doc.ref, { images: arrayUnion(downloadURL) })
              );
            })
            .then(() => {
              console.log("file and images added succesfully");
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        });
      })
    );

    // try {
    //   if (imageFiles.length === 0) return;
    //   const imageRef = storageref(
    //     storage,
    //     `images/${uuid}`
    //     // + ${imageUpload.name}
    //   );
    //   const uploadTask = uploadBytesResumable(imageRef, imageFiles[i]);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //       // progrss function ....
    //       const progress =
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log("Upload is " + progress.toFixed() + "% done");
    //     },
    //     (error) => {
    //       // error function ....
    //       console.log(error);
    //     },
    //     () => {
    //       // complete function ....
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setImageUrl(downloadURL);
    //       });
    //     }
    //   );
    // } catch (error) {
    //   throw error;
    // }
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

  const writeToDatabase = (values) => {
    const {
      category,
      currency,
      description,
      itemName,
      itemPrice,
      sellerName,
      sellerNumber,
    } = values;
    const docRef = doc(storedb, "users", user.email);
    const colRef = collection(docRef, "items");

    addDoc(colRef, {
      date: date,
      uuid,
      category,
      currency,
      description,
      itemName,
      itemPrice,
      sellerName,
      sellerNumber,
      userUid,
      imageurl,
      views: 0,
    })
      .then(() => {
        setUuid(uid());
        // setTitle("");
        // setCategory("");
        // setContactNumber("");
        // setDescription("");
        // setPrice("");
        // setSellerName("");
        setImageUrl("");
        setItemAddedSuccesfully(true);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const changeHandler = (values) => {
    uploadItem(values);
  };

  // After click on item views are adding in firebase

  const addViewsToDatabase = (uuid, view) => {
    const viewPlus = view + 1;
    const itemsCollection = collectionGroup(storedb, "items");
    const q = query(itemsCollection, where("uuid", "==", uuid));
    getDocs(q)
      .then((collection) => {
        collection.docs.forEach((doc) =>
          updateDoc(doc.ref, { views: viewPlus })
        );
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
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

  return (
    <dataContext.Provider
      value={{
        // category,
        // setCategory,
        // contactnumber,
        // setContactNumber,
        // description,
        // setDescription,
        // price,
        // setPrice,
        // sellername,
        // setSellerName,
        // title,
        // setTitle,
        setImageFilesArray,
        imageFilesArray,
        setUploadItemData,
        imageurl,
        setImageUrl,
        changeHandler,
        items,
        uploadItem,
        setImageUploadDone,
        imageuploaddone,
        imageUpload,
        setImageUpload,
        userdata,
        useritems,
        deleteItemFromDatabase,
        itemdeletedsucecsfully,
        setItemDeletedSuccesfully,
        itemAddedSuccesfully,
        setItemAddedSuccesfully,
        addViewsToDatabase,
        imageFiles,
        setImageFiles,
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
