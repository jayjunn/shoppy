import React from "react";
import {
  IoArchiveOutline,
  IoCartOutline,
  IoPencilSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import User from "./User";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const { numOfProducts } = useCartContext();
  return (
    <nav className="flex items-center justify-between p-2">
      <Link to={"/"} className="flex items-center">
        <IoArchiveOutline size={40} />
        <pre className="text-2xl">Shoppy</pre>
      </Link>
      <div className="flex items-center">
        {user && (
          <>
            <Link to={"/cart"} className="mr-3 flex items-center">
              <IoCartOutline size={40} />
              <span>{numOfProducts >= 1 && `(${numOfProducts})`}</span>
            </Link>
          </>
        )}
        {user?.isAdmin && (
          <Link to={"/product/register"} className="mr-3">
            <IoPencilSharp size={40} />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && (
          <button
            className="bg-emerald-700 p-3 px-8 text-xl font-bold text-white"
            onClick={login}
          >
            Login
          </button>
        )}
        {user && (
          <button className="= p-3 text-xl font-bold" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
