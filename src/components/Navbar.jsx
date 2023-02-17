import React, { useEffect, useState } from "react";
import {
  IoArchiveOutline,
  IoCartOutline,
  IoPencilSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { login, logout, onAuthStateChange } from "../utils/firebase";

export default function Navbar() {
  const [user, setUser] = useState();

  console.log(user);

  const handleLogin = () => {
    login().then(setUser);
  };

  const handleLogOut = () => {
    logout().then(setUser);
  };

  useEffect(() => {
    onAuthStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <nav className="flex justify-between">
      <Link to={"/"} className="flex">
        <IoArchiveOutline size={40} />
        <pre className="text-2xl">Shoppy</pre>
      </Link>
      <div className="flex">
        <Link to={"/cart"}>
          <IoCartOutline size={40} />
        </Link>
        <Link to={"/product/register"}>
          <IoPencilSharp size={40} />
        </Link>
        {!user && (
          <button
            className="bg-emerald-700 p-3 px-8 text-xl font-bold text-white"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
        {user && (
          <button
            className="bg-emerald-700 p-3 px-8 text-xl font-bold text-white"
            onClick={handleLogOut}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
