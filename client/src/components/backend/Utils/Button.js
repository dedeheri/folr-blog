import React from "react";

function Button({ text, ...rest }) {
  return (
    <button
      {...rest}
      type="submit"
      className="bg-[#2374E1] px-4 hover:bg-[#0B5AC6] duration-300 text-white h-8 md:h-10 w-full rounded-md"
    >
      <h1 className="font-medium text-lg">{text}</h1>
    </button>
  );
}

export default Button;
