import React, { useState } from "react";

// icons
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function Password({ label, placeholder, type, error, message, ...rest }) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-lg">{label}</label>
      <div
        className={`h-11 flex items-center px-2 border rounded-md ${
          error ? "border-red-500" : "dark:border-[#353535]"
        } `}
      >
        <input
          autoComplete="true"
          type={show ? "text" : "password"}
          className={`bg-transparent w-full  outline-none `}
          placeholder={placeholder}
          {...rest}
        />

        {show ? (
          <div onClick={() => setShow((prev) => !prev)}>
            <EyeIcon className="w-5 cursor-pointer text-gray-400 hover:text-gray-500 hover:dark:text-gray-300 duration-300" />
          </div>
        ) : (
          <div onClick={() => setShow((prev) => !prev)}>
            <EyeOffIcon className="w-5 cursor-pointer text-gray-400 hover:text-gray-500 hover:dark:text-gray-300 duration-300" />
          </div>
        )}
      </div>

      {message && <h1 className="text-red-400 text-lg">{message}</h1>}
    </div>
  );
}

export default Password;
