import { RefreshIcon, WifiIcon } from "@heroicons/react/solid";
import React from "react";

import Button from "../components/Button";

function Error() {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="flex justify-between bg-gray-100 dark:bg-[#2d2e2e] p-3 rounded-lg">
      <h1 className="text-2xl font-medium text-red-500">
        Terjadi kesalahan saat memuat konten !
      </h1>
      <button
        onClick={refreshPage}
        className="h-9 w-40 text-white text-lg font-medium duration-300 rounded-md bg-[#2374e1] hover:bg-[#0f5abb] flex items-center space-x-4 justify-center"
      >
        <RefreshIcon className="w-6" />
        <h1>Muat Ulang</h1>
      </button>
    </div>
  );
}

export default Error;
