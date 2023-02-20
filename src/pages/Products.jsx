import React from "react";
import { useQuery } from "react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "../components/ProductCard";

export default function Product() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      <h1 className="text-2xl ">Products</h1>
      <ul className="grid grid-cols-2 gap-1 lg:grid-cols-3 xl:grid-cols-4">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </ul>
    </div>
  );
}
