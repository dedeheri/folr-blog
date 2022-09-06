import React from "react";

function Input({ error, ...rest }) {
  return (
    <div className="space-y-1">
      <input
        {...rest}
        autoComplete="email"
        className={`outline-none border bg-transparent  h-10 w-full px-3 rounded-md ${
          error ? "border-red-500" : "dark:border-[#3A3B3C]"
        }`}
      />

      {error && <h1 className="font-medium text-red-500">{error}</h1>}
    </div>
  );
}

export default Input;
