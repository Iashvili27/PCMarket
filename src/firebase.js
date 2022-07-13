import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDdqqfXnc1g5VZidV7LkxClASGY05ynp3w",
  authDomain: "pcmarket-21f7c.firebaseapp.com",
  projectId: "pcmarket-21f7c",
  storageBucket: "pcmarket-21f7c.appspot.com",
  messagingSenderId: "445521093644",
  appId: "1:445521093644:web:2d0e0ce5a9c5bb75a1ba29",
  measurementId: "G-4FNY1HX0D2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
