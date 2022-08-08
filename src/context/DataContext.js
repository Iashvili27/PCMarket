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
  // uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { useUserAuth } from "./UserAuthContext";

const dataContext = createContext();

export function DataContextProvider({ children }) {
  const { user } = useUserAuth();
  const [imageFiles, setImageFiles] = useState([]);

  // Data for Users and Items
  const [items, setItems] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [useritems, setUserItems] = useState([]);
  const [uuid, setUuid] = useState(uid());
  const userUid = user ? user.uid : null;
  // States for modal
  const [itemDeletedSucecsfully, setItemDeletedSuccesfully] = useState(false);
  const [imageDeletedSucecsfully, setImageDeletedSuccesfully] = useState(false);
  const [itemAddedSuccesfully, setItemAddedSuccesfully] = useState(false);
  const [itemImageAddedSuccesfully, setItemImageAddedSuccesfully] =
    useState(false);

  // User uploads image and file in Database
  // User Adds Item In Database

  const changeHandler = (values) => {
    uploadItem(values);
  };

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
        setItemAddedSuccesfully(true);
        setUuid("");
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    if (imageFiles.length === 0) return;

    imageFiles.forEach((image, index) => {
      const imageRef = storageref(storage, `images/${uuid} + ${index}`);
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
            setItemImageAddedSuccesfully(true);
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
      });
    });

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

  // USER EDITS ITEM

  const editItem = (uuid, values) => {
    const itemsCollection = collectionGroup(storedb, "items");
    const q = query(itemsCollection, where("uuid", "==", uuid));
    getDocs(q)
      .then((collection) => {
        collection.docs.forEach((doc) =>
          updateDoc(doc.ref, {
            category: values.category,
            currency: values.currency,
            description: values.description,
            itemName: values.itemName,
            itemPrice: values.itemPrice,
            sellerName: values.sellerName,
            sellerNumber: values.sellerNumber,
          })
        );
        console.log("updated");
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
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

  // User Deletes Item and Image From Database
  // Sometimes not all the images are getting deleted. Needs fix

  const deleteItemFromDatabase = async (item) => {
    if (user && user.email) {
      const docRef = doc(storedb, "users", `${user.email}`);
      const getCol = collection(docRef, "items");
      const q = query(getCol, where("uuid", "==", item));
      let imagesArray;
      await getDocs(q)
        .then((collection) => {
          collection.docs.map((doc) => (imagesArray = doc.data().images));
          for (var i = 0; i < imagesArray.length; i++) {
            const desertRef = storageref(storage, `images/${item} + ${i}`);
            deleteObject(desertRef).catch((error) => {
              console.log(error);
            });
          }
        })
        .then(() => {
          setImageDeletedSuccesfully(true);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });

      await getDocs(q)
        .then((collection) => {
          collection.docs.forEach((doc) => deleteDoc(doc.ref));
        })
        .then(() => {
          setItemDeletedSuccesfully(true);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
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

      // Get All items for Main Page
      const itemsCollection = collectionGroup(storedb, "items");
      getDocs(itemsCollection)
        .then((collection) => {
          setItems(collection.docs.map((doc) => doc.data()));
        })
        .catch((error) => {
          console.log(error);
        });
    }, 500);
  }, [user]);

  return (
    <dataContext.Provider
      value={{
        changeHandler,
        items,
        imageDeletedSucecsfully,
        useritems,
        deleteItemFromDatabase,
        itemDeletedSucecsfully,
        setItemDeletedSuccesfully,
        itemAddedSuccesfully,
        setItemAddedSuccesfully,
        addViewsToDatabase,
        imageFiles,
        setImageFiles,
        itemImageAddedSuccesfully,
        setItemImageAddedSuccesfully,
        editItem,
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
