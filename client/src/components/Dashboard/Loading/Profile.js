import React from "react";
import Sub from "../Sub";

function Profile() {
  return (
    <Sub title={"Loading"}>
      <div className="animate-pulse ">
        <div className="flex items-center  space-x-4 ">
          <div className="w-28 h-28  md:w-32 md:h-32  lg:w-40 lg:h-40 rounded-full border-4 dark:border-[#3a3b3c] border-gray-100 bg-gray-100 dark:bg-[#252525]" />
          <div className="space-y-4 ">
            <div className="bg-gray-100 dark:bg-[#252525] w-64 h-7 rounded-md" />
            <div className="bg-gray-100 dark:bg-[#252525] w-80 h-7 rounded-md" />
          </div>
        </div>

        <div className="pt-10 space-x-4 flex">
          <div className="bg-gray-100 dark:bg-[#252525] w-52 h-9 rounded-md" />
          <div className="bg-gray-100 dark:bg-[#252525] w-52 h-9 rounded-md" />
          <div className="bg-gray-100 dark:bg-[#252525] w-52 h-9 rounded-md" />
        </div>
      </div>
    </Sub>
  );
}

export default Profile;
