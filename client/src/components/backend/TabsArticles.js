import { PlusIcon } from "@heroicons/react/outline";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Fitler from "./Fitler";

function TabsArticles() {
  return (
    <div className="space-y-2 pt-2">
      <div className="flex space-x-3 border-b dark:border-[#3A3B3C]">
        <NavLink
          end={true}
          className={({ isActive }) =>
            isActive
              ? "font-medium text-md md:text-lg border-b-[0.2rem] pb-1 border-[#2374E1] px-1"
              : "font-medium text-md md:text-lg border-b-[0.2rem] pb-1 border-transparent text-[#909090] hover:dark:text-white px-1 hover:border-[#2374E1] hover:text-black duration-300"
          }
          to={"/articles"}
        >
          <h1>Publikasi</h1>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "font-medium text-md md:text-lg border-b-[0.2rem] pb-1 border-[#2374E1] px-1"
              : "font-medium text-md md:text-lg border-b-[0.2rem] pb-1 border-transparent text-[#909090] px-1 hover:border-[#2374E1] hover:text-black hover:dark:text-white duration-300"
          }
          to={"/articles/draft"}
        >
          <h1>Draft</h1>
        </NavLink>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-5 items-center">
          <Fitler />
          {/* <h1 className="dark:bg-[#3A3B3C] p-1 rounded-md">{createdAt}</h1> */}
        </div>
        <Link to={"add"}>
          <div className="flex space-x-2 items-center text-[#2374E1] hover:bg-blue-200 dark:hover:bg-[#063168] px-3 py-1 rounded-md cursor-pointer duration-300">
            <PlusIcon className="w-5" />
            <h1 className="font-medium text-md md:text-lg">Tambah</h1>
          </div>
        </Link>
      </div>
      <div className="border-b dark:border-[#3A3B3C]" />
    </div>
  );
}

export default TabsArticles;
