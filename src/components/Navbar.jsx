import React from "react";
import { IoLogOutOutline, IoCartOutline, IoPencilSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useCarts from "../hooks/useCarts";
import User from "./User";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();
  const {
    cartQuery: { data: products },
  } = useCarts();

  return (
    <nav className="fixed top-0 flex h-[60px] w-full  items-center justify-between border-b-[1px] bg-white p-2">
      <Link to={"/"} className="flex items-center">
        <pre className="text-2xl">AC</pre>
      </Link>
      <div className="flex items-center">
        {user && (
          <Link to={"/cart"} className="mr-3 flex items-center">
            <IoCartOutline size={25} />
            {products && products.length >= 1 && (
              <p className=" text-xs">({products.length})</p>
            )}
          </Link>
        )}
        {user?.isAdmin && (
          <Link to={"/product/register"} className="mr-3">
            <IoPencilSharp size={20} />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && (
          <button className="p-3 text-sm" onClick={login}>
            Login
          </button>
        )}
        {user && (
          <button className="p-3 text-sm" onClick={logout}>
            <IoLogOutOutline size={20} />
          </button>
        )}
      </div>
    </nav>
  );
}
