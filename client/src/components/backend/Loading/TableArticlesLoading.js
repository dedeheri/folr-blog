import React from "react";

function TableArticlesLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(10)].map((_, i) => (
        <div key={i}>
          <div className="space-x-4 flex w-full">
            <div className="h-8 w-[205rem] bg-gray-200 dark:bg-[#1f1f1f] rounded-sm" />
            <div className="h-8 w-full bg-gray-200 dark:bg-[#1f1f1f] rounded-sm" />
            <div className="h-8 w-full bg-gray-200 dark:bg-[#1f1f1f] rounded-sm" />
            <div className="h-8 w-full bg-gray-200 dark:bg-[#1f1f1f] rounded-sm" />
            <div className="h-8 w-full bg-gray-200 dark:bg-[#1f1f1f] rounded-sm" />
            <div className="h-8 w-full bg-gray-200 dark:bg-[#1f1f1f] rounded-sm" />
            <div className="h-8 w-full bg-gray-200 dark:bg-[#1f1f1f] rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TableArticlesLoading;
