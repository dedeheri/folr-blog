import React from "react";

function LoadingCard() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex justify-end space-x-5">
        <div className="h-10 w-40 rounded-md bg-gray-100 dark:bg-[#252525]" />
        <div className="h-10 w-60 rounded-md bg-gray-100 dark:bg-[#252525]" />
      </div>

      <div className="space-y-4">
        {[...Array(3)].map((x, i) => (
          <div className="space-y-3" key={i}>
            <div className="flex space-x-3">
              <div className="w-40 h-28 md:w-64 md:h-32 rounded-md bg-gray-100 dark:bg-[#252525]" />
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between">
                  <div className="h-6 w-1/3 rounded-md bg-gray-100 dark:bg-[#252525]" />

                  <div className="flex space-x-4">
                    <div className="h-6 w-14 rounded-md bg-gray-100 dark:bg-[#252525]" />
                    <div className="h-6 w-14 rounded-md bg-gray-100 dark:bg-[#252525]" />
                    <div className="h-6 w-14 rounded-md bg-gray-100 dark:bg-[#252525]" />
                  </div>
                </div>
                <div className="h-6 w-1/2 rounded-md bg-gray-100 dark:bg-[#252525]" />
                <div className="h-6 w-full rounded-md bg-gray-100 dark:bg-[#252525]" />
                <div className="flex justify-between">
                  <div className="h-6 w-40 rounded-md bg-gray-100 dark:bg-[#252525]" />
                  <div className="h-6 w-8 rounded-md bg-gray-100 dark:bg-[#252525]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingCard;
