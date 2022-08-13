import { XIcon } from "@heroicons/react/solid";
import React from "react";

function Modal({ label, children, close, show }) {
  function handleClose() {
    close((prev) => !prev);
  }

  return (
    <div
      className={`inset-0 px-4 fixed h-full z-50  bg-black bg-opacity-60 backdrop-blur-sm ${
        show ? "-translate-y-0 " : "-translate-y-full"
      }`}
    >
      {/* content */}
      <div
        className={`relative inset-0 top-36 md:top-40 mx-auto lg:top-48 w-full max-w-xl transform overflow-y-auto rounded-xl bg-white dark:bg-[#242526] border dark:border-[#3a3b3c] text-left align-middle shadow-xl duration-300 text-white  ${
          show ? "scale-100 " : "scale-95"
        }`}
      >
        <div className="border-b text-black dark:text-white dark:border-[#3a3b3c] px-5 py-3 flex items-center justify-between">
          <h1 className="text-xl font-medium">{label}</h1>
          <button
            onClick={handleClose}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3a3b3c] dark:hover:bg-[#404142] p-2 duration-300 rounded-full"
          >
            <XIcon className="w-5 text-gray-600 dark:text-gray-300 rounded-lg" />
          </button>
        </div>
        <div className="space-y-2 pt-3 p-5">{children}</div>
      </div>
      {/* end content */}
    </div>
  );
}

export default Modal;