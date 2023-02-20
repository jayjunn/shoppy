import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../api/firebase";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [numOfProducts, setNumOfProducts] = useState();

  useEffect(() => {
    fetchCart();
  }, []);

  const addNum = () => {
    setNumOfProducts(numOfProducts + 1);
  };

  const fetchCart = () => {
    getCart(setProducts).then((res) => {
      setNumOfProducts(res.length);
    });
  };

  return (
    <CartContext.Provider
      value={{ products, numOfProducts, addNum, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
