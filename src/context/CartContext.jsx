import { createContext, useContext, useEffect, useState } from "react";
import { getCart, updateCartItem } from "../api/firebase";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [numOfProducts, setNumOfProducts] = useState();

  const addNum = () => {
    setNumOfProducts(numOfProducts + 1);
  };

  const fetchCart = () => {
    getCart(setProducts).then((res) => {
      setNumOfProducts(res.length);
    });
  };

  const setCartItem = async (product) => {
    updateCartItem(product).then(() => fetchCart());
  };

  const setQuantity = async (product, updatedQuantity) => {
    updateCartItem(product, updatedQuantity).then(() => fetchCart());
  };

  useEffect(() => {
    fetchCart();
  }, [numOfProducts]);

  return (
    <CartContext.Provider
      value={{
        products,
        numOfProducts,
        addNum,
        fetchCart,
        setCartItem,
        setQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
