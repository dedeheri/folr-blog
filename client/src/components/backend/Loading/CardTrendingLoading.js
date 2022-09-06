import React from "react";

function CardTrendingLoading() {
  return [...Array(5)].map((_, i) => (
    <div key={i} className="space-y-2 animate-pulse">
      <div className="h-8 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
      <div className="h-8 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
      <div className="h-8 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
    </div>
  ));
}

export default CardTrendingLoading;
