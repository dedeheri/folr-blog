import React from "react";

function Forbidden({ message }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center flex space-x-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">403</h1>
        <div className="border-r dark:border-[#353535]" />
        <h2 className="text-3xl md:text-4xl lg:text-5xl"> {message}</h2>
      </div>
    </div>
  );
}

export default Forbidden;
