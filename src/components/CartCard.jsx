import React, { useEffect, useState } from "react";
import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { useCartContext } from "../context/CartContext";

export default function CartCard({ product }) {
  const { id, imageUrl, name, price, quantity, size } = product;
  const { setCartItem, setQuantity } = useCartContext();
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  const handleAddQuantity = () => {
    setUpdatedQuantity(updatedQuantity + 1);
  };

  const handleRemoveQuantity = () => {
    setUpdatedQuantity(updatedQuantity - 1);
  };

  useEffect(() => {
    setQuantity(product, updatedQuantity);
  }, [updatedQuantity]);

  return (
    <li key={id} className="mb-2 flex">
      <img src={imageUrl} alt={name} className="w-3/12 md:w-2/12" />
      <div className="ml-2 flex w-full justify-between">
        <div>
          <p>{name}</p>
          <p>£{price}.00</p>
          <div className="mt-3 flex">
            <div className="flex flex-col">
              <span className="pr-10">Size</span>
              <span className="pr-10">Quantity</span>
            </div>
            <div className="flex flex-col">
              <p> {size.toUpperCase()}</p>
              <div className="flex">
                <button onClick={handleRemoveQuantity}>
                  <IoRemove />
                </button>
                <p>{quantity}</p>
                <button onClick={handleAddQuantity}>
                  <IoAdd />
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="flex justify-start"
          onClick={() => setCartItem(product)}
        >
          <IoTrashOutline />
        </button>
      </div>
    </li>
  );
}
