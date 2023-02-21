import React from "react";

export default function User({ user: { displayName, photoURL } }) {
  return (
    <div className="flex items-center">
      <img
        src={photoURL}
        alt="displayName"
        className=" w-8 rounded-full p-1"
      />
    </div>
  );
}
