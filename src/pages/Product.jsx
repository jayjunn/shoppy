import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Product() {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    state: { product },
  } = useLocation();
  const { imageUrl, name, price, options, description } = product;
  const navigate = useNavigate();

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };
  const handleAddToCart = () => {
    // navigate('/cart')
  };

  return (
    <section className="mt-10  flex flex-col md:flex-row">
      <div className="basis-4/6">
        <img src={imageUrl} alt={name} className="px-20" />
      </div>
      <div className="mr-10 mt-10 flex w-full basis-2/6 flex-col items-center justify-center px-2 md:mt-0 md:items-start md:justify-start md:px-0">
        <div className="mb-10 flex flex-col items-center md:items-start">
          <h1 className="text-2xl">{name}</h1>
          <p className="text-xl">£{price}.00</p>
        </div>
        <div className="mb-10 flex flex-col items-center md:items-start">
          <p className="mb-3">SIZE</p>
          <ul className="mt-1">
            {options.map((option) => {
              return (
                <button
                  onClick={() => handleOptionClick(option)}
                  className={`mr-2 h-10 w-10 border-2 border-gray-500 p-2  ${
                    option === selectedOption ? "bg-slate-100" : ""
                  }`}
                >
                  {option.toUpperCase()}
                </button>
              );
            })}
          </ul>
        </div>
        <button className="mb-10 w-full border bg-indigo-700 px-10 py-4 text-white">
          Add To Cart
        </button>
        <div className="mb-10 md:mb-0">
          <h1 className="mb-3 uppercase">Product Description</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
