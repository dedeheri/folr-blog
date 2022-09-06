import React from "react";
import Container from "../Container";

function TableArticlesLoading() {
  return (
    <Container title={"Loading"}>
      <div className="space-y-4 animate-pulse">
        <div className="flex space-x-2">
          <div className="h-8 w-40 bg-gray-200 dark:bg-[#252525] rounded-md" />
          <div className="h-8 w-40 bg-gray-200 dark:bg-[#252525] rounded-md" />
        </div>

        <div className=" border-b duration-400 dark:border-[#3A3B3C]" />

        <div className="flex space-x-2 justify-between">
          <div className="flex space-x-2">
            <div className="h-8 w-40 bg-gray-200 dark:bg-[#252525] rounded-md" />
          </div>
          <div className="h-8 w-40 bg-gray-200 dark:bg-[#252525] rounded-md" />
        </div>
        <div className=" border-b duration-400 dark:border-[#3A3B3C]" />

        {[...Array(10)].map((_, i) => (
          <div key={i}>
            <div className="space-x-4 flex w-full">
              <div className="h-6 w-[205rem] bg-gray-200 dark:bg-[#252525] rounded-md" />
              <div className="h-6 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
              <div className="h-6 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
              <div className="h-6 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
              <div className="h-6 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
              <div className="h-6 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
              <div className="h-6 w-full bg-gray-200 dark:bg-[#252525] rounded-md" />
            </div>

            <div className=" border-b duration-400 dark:border-[#3A3B3C]" />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default TableArticlesLoading;
