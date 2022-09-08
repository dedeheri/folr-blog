import React from "react";

function Back({ text, ...rest }) {
  return (
    <div
      {...rest}
      className={`cursor-pointer hover:bg-opacity-80 duration-300 text-white h-10 w-full rounded-md border dark:border-[#3a3b3c] flex items-center justify-center`}
    >
      <h1 className="font-medium text-lg">{text}</h1>
    </div>
  );
}

export default Back;
