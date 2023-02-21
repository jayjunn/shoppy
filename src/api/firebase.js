// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: "shopy-64991.appspot.com",
  messagingSenderId: "145600576776",
  appId: "1:145600576776:web:bf9c454e2a8f35b5c8c0bd",
  measurementId: "G-KVPR1N4572",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

export const logout = () => {
  signOut(auth).catch(console.error);
};

export const onAuthStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminUser(user) : null;
    callback(updateUser);
  });
};

const adminUser = async (user) => {
  return get(ref(database, `admins`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const addNewProduct = async (product, imageUrl) => {
  const id = uuid();
  const newProduct = {
    ...product,
    price: parseInt(product.price),
    imageUrl,
    options: product.options.split(","),
    id,
    ...(!product.category && { category: "Women" }),
  };
  return set(ref(database, `products/${id}`), newProduct);
};

export const addOrUpdateToCart = async (uid, product) => {
  return set(ref(database, `cart/${uid}/${product.id}`), product);
};

export const getProducts = async () => {
  return get(ref(database, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = Object.values(snapshot.val());
        return products;
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getCart = async (uid) => {
  return get(ref(database, `cart/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const addProducts = Object.values(snapshot.val());
        return addProducts;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const removeCartItem = (uid, productId) => {
  remove(ref(database, `cart/${uid}/${productId}`));
};
