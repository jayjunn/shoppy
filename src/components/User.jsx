import React from "react";

export default function User({ user: { displayName, photoURL } }) {
  console.log(photoURL, displayName);
  return (
    <div className="mr-3 flex items-center">
      <img
        src={photoURL}
        alt="displayName"
        className="mr-3 w-12 rounded-full p-1"
      />
      <span className="hidden md:block">{displayName}</span>
    </div>
  );
}
