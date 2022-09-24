import React from "react";
import { DocumentRemoveIcon } from "@heroicons/react/solid";

function Empty() {
  return (
    <div className="flex flex-col items-center pt-32 text-gray-300 dark:text-[#3A3B3C]">
      <DocumentRemoveIcon className="w-32 md:w-52" />
      <h1 className="text-2xl md:text-3xl font-medium">
        Data ditampilkan disini
      </h1>
    </div>
  );
}

export default Empty;
