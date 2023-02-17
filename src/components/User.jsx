import React from "react";

export default function User({ user: { displayName, photoURL } }) {
  return (
    <div className="flex items-center mr-3">
      <img src={photoURL} alt="displayName" className="p-1 w-12 rounded-full mr-3" />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}
