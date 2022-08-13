import React from "react";

function LoadingFeatured() {
  return (
    <div className="flex w-full space-x-2 overflow-x-scroll scrollbar-hide animate-pulse">
      {[...Array(4)].map((x, i) => (
        <div
          key={i}
          className="dark:bg-[#252525] bg-gray-100 rounded-xl h-32 md:h-36 lg:h-40 w-full"
        />
      ))}
    </div>
  );
}

export default LoadingFeatured;
