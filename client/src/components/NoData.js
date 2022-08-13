import { InboxIcon } from "@heroicons/react/solid";
import React from "react";

function NoData({ message }) {
  return (
    <div className="text-gray-100 dark:text-[#252525] flex flex-col items-center justify-center mt-32">
      <InboxIcon className="w-80" />

      {message ? (
        <h1 className="text-4xl font-medium"> {message}</h1>
      ) : (
        <h1 className="text-4xl font-medium">Data akan muncul disini</h1>
      )}
    </div>
  );
}

export default NoData;
