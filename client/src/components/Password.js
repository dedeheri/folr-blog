import React, { useState } from "react";

// icons
import { ExclamationIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function Password({ label, placeholder, type, error, ...rest }) {
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

      {error && (
        <div className="flex space-x-2 text-red-400">
          <ExclamationIcon className="w-4" />
          <h1 className="text-md">{error}</h1>
        </div>
      )}
    </div>
  );
}

export default Password;
