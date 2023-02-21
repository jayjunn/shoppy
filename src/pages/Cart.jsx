import React from "react";
import CartCard from "../components/CartCard";
import { useAuthContext } from "../context/AuthContext";
import useCarts from "../hooks/useCarts";
export default function Cart() {
  const { uid } = useAuthContext();
  const {
    cartQuery: { isLoading, data: products },
  } = useCarts(uid);
  const isEmptyList = products && products.length === 0;
  const sumPrice =
    products && products.reduce((acc, current) => acc + current["price"], 0);

  const deliveryFee = (sumPrice) => {
    return sumPrice >= 200 ? 0 : 2;
  };

  return (
    <section className="mt-10 flex flex-col p-4 lg:flex-row lg:justify-between">
      {isEmptyList && <p>Your cart is empty</p>}
      {isLoading && <p>is loading...</p>}
      {!isEmptyList && (
        <div>
          <ul className="lg:w-3/6">
            {products?.map((product) => {
              return <CartCard key={product.id} product={product} />;
            })}
          </ul>
          <hr className="my-6" />
          <div className="lg:w-2/6">
            <div className="flex  flex-col justify-between">
              <label className="flex w-full justify-between">
                <span>Subtotal</span>
                <span>£{sumPrice}.00</span>
              </label>
              <label className="flex w-full justify-between">
                <span>Estimated Delivery & Handling</span>
                <span>£{deliveryFee(sumPrice)}.00</span>
              </label>
            </div>
            <hr className="my-6" />
            <p className="flex justify-between">
              <span>Total</span>
              <span>£{sumPrice + deliveryFee(sumPrice)}.00</span>
            </p>
            <hr className="my-6" />
            <button className=" w-full bg-neutral-700 p-4 text-white">
              Place an order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
