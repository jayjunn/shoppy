// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBq1l8pIXkVho8HemjQnetzcLpd3Npr10Q",
  authDomain: "shopy-64991.firebaseapp.com",
  databaseURL:
    "https://shopy-64991-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shopy-64991",
  storageBucket: "shopy-64991.appspot.com",
  messagingSenderId: "145600576776",
  appId: "1:145600576776:web:bf9c454e2a8f35b5c8c0bd",
  measurementId: "G-KVPR1N4572",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const login = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => console.log(error));
};

export const logout = async () => {
  return signOut(auth)
    .then(() => {
      return null;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
