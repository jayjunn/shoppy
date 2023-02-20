import React from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

export default function CartCard({ product }) {
  const { id, imageUrl, name, price, quantity, size } = product;
  return (
    <li key={id} className="flex mb-2">
      <img src={imageUrl} alt={name} className="w-3/12 md:w-2/12" />
      <div className="ml-2">
        <div>
          <p>{name}</p>
          <p>£{price}.00</p>
          <div className="mt-3 flex">
            <div className="flex flex-col">
              <span className="pr-10">Size</span>
              <span className="pr-10">Quantity</span>
            </div>
            <div className="flex flex-col">
              <p> {size}</p>
              <div className="flex">
                <button>
                  <IoRemove />
                </button>
                <p>{quantity}</p>
                <button>
                  <IoAdd />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}