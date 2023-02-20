import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { imageUrl, name, price, category, id } = product;
  const handleClick = () => {
    navigate(`/product/${id}`, { state: { product } });
  };
  return (
    <li className=" hover:cursor-pointer" onClick={handleClick}>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
      <p>£{price}.00</p>
      <p>{category}</p>
    </li>
  );
}
