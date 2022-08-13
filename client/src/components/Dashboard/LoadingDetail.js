import React from "react";

function LoadingDetail() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex space-x-3 items-center ">
        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#252525]" />

        <div className="space-y-1 w-full">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="w-48 h-6 bg-gray-100 dark:bg-[#252525] rounded-md" />
              <div className="w-48 h-6 bg-gray-100 dark:bg-[#252525] rounded-md" />
            </div>
            <div className="space-x-2 flex">
              <div className="w-10 h-6 bg-gray-100 dark:bg-[#252525] rounded-md" />
              <div className="w-10 h-6 bg-gray-100 dark:bg-[#252525] rounded-md" />
              <div className="w-10 h-6 bg-gray-100 dark:bg-[#252525] rounded-md" />
              <div className="w-10 h-6 bg-gray-100 dark:bg-[#252525] rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-10 bg-gray-100 dark:bg-[#252525] rounded-md" />
      <div className="space-y-2">
        {[...Array(12)].map((x, i) => (
          <div
            key={i}
            className="w-full h-7 bg-gray-100 dark:bg-[#252525] rounded-md"
          />
        ))}
      </div>
    </div>
  );
}

export default LoadingDetail;
