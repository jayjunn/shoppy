import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useCarts from "../hooks/useCarts";

export default function Product() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [validation, setValidation] = useState("");
  const {
    state: {
      product: { imageUrl, name, price, options, description, id },
    },
  } = useLocation();

  const { addOrUpdateCart } = useCarts();
  const {
    cartQuery: { data: carts },
  } = useCarts();

  const handleOptionClick = (value) => {
    setSelectedOption(value);
  };

  const handleAddToCart = (e) => {
    const duplicatedSizeItem = carts.find(
      (product) => product.id === id && product.size === selectedOption
    );

    const duplicatedItem = carts.find((product) => product.id === id);

    console.log(duplicatedItem);

    if (selectedOption) {
      const product = {
        imageUrl,
        name,
        price,
        id,
        size: selectedOption,
        quantity: duplicatedSizeItem ? duplicatedSizeItem.quantity + 1 : 1,
      };
      addOrUpdateCart.mutate(
        { product },
        {
          onSuccess: () => {
            setIsSuccess("Item has been added");
            setTimeout(() => {
              setIsSuccess(null);
            }, 2000);
          },
        }
      );
    } else {
      setValidation("Please select a size");
      setTimeout(() => {
        setValidation(null);
      }, 900);
    }
    return;
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
                  key={option}
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
        <button
          className="mb-10 w-full border bg-neutral-700 px-10 py-4 text-white"
          onClick={handleAddToCart}
        >
          {validation && `${validation}`}
          {isSuccess && `${isSuccess}`}
          {!isSuccess && !validation && "Add To Cart"}
        </button>
        <div className="mb-10 md:mb-0">
          <h1 className="mb-3 uppercase">Product Description</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
