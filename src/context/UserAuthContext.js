import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { storage, storedb } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState([]);

  const updateUserPassword = (newPassword) => {
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        console.log("password changed");
      })
      .catch((error) => {
        console.log("error happened");
      });
  };

  function emailVerification() {
    return sendEmailVerification(auth.currentUser);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(() =>
      sendEmailVerification(auth.currentUser)
    );
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      // console.log("Auth", currentuser);
      setUser(currentuser);
    });
    setTimeout(() => {
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
    }, 500);

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <userAuthContext.Provider
      value={{
        user,
        userData,
        setUserData,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        emailVerification,
        updateUserPassword,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
