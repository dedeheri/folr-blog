import { useState } from "react";

function Password({ error, ...rest }) {
  const [show, setShow] = useState(true);
  return (
    <div className="space-y-1">
      <div
        className={`border relative h-10 w-full rounded-md flex justify-between items-center ${
          error ? "border-red-500" : "dark:border-[#3A3B3C] "
        }`}
      >
        <input
          {...rest}
          autoComplete="current-password"
          type={show ? "password" : "text"}
          className="outline-none px-3 bg-transparent"
          placeholder="Kata Sandi"
        />

        {show ? (
          <div className="bg-[#E8F2FF] dark:bg-[#1C314D] absolute rounded-r-md right-0 w-auto h-full flex items-center px-3 cursor-pointer">
            <h1
              onClick={() => setShow(!show)}
              className="text-[#4592f7] font-medium "
            >
              Tampilkan
            </h1>
          </div>
        ) : (
          <div className="bg-[#E8F2FF] dark:bg-[#1C314D] rounded-r-md absolute right-0 w-auto h-full flex items-center px-3 cursor-pointer">
            <h1
              onClick={() => setShow(!show)}
              className="text-[#4592f7] font-medium "
            >
              Sembunyikan
            </h1>
          </div>
        )}
      </div>

      {error && <h1 className="font-medium text-red-500">{error}</h1>}
    </div>
  );
}

export default Password;
