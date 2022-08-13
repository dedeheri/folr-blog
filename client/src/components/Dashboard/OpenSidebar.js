import { PlusIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";

function OpenSidebar({ setShow, children }) {
  return (
    <Fragment>
      <button
        onClick={() => setShow(true)}
        className="md:bg-[#2374e1] md:hover:bg-[#0f5abb] duration-300 md:px-4 items-center h-10  rounded-md flex space-x-3"
      >
        <PlusIcon className="w-7 md:w-6 text-white" />
        <h1 className="font-medium text-lg hidden md:block text-white">
          Tambah Kategori
        </h1>
      </button>

      {children}
    </Fragment>
  );
}

export default OpenSidebar;
