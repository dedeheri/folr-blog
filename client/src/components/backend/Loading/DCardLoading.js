import React from "react";

function DCardLoading() {
  return [...Array(6)].map((_, i) => (
    <div key={i} className="flex animate-pulse space-x-3">
      <div className="w-44 h-28   bg-gray-200 dark:bg-[#252525] rounded-md" />
      <div className="w-full space-y-3">
        <div className="bg-gray-200 dark:bg-[#252525] rounded-md h-8 md:w-1/2" />
        <div className="bg-gray-200 dark:bg-[#252525] rounded-md h-8 md:w-1/2" />
        <div className="bg-gray-200 dark:bg-[#252525] rounded-md h-8 md:w-1/2" />
      </div>
    </div>
  ));
}

export default DCardLoading;
