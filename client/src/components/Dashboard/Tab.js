import { ArchiveIcon, SpeakerphoneIcon } from "@heroicons/react/solid";
import React from "react";
import { NavLink } from "react-router-dom";
import Tooltips from "../Tooltips";

function Tab() {
  const activeStateNavLink =
    "flex items-center space-x-2 md:border-b-[0.2rem] md:border-[#00AB4C] md:dark:border-[#2BEF82] pb-2 text-[#00AB4C] dark:text-[#2BEF82] md:dark:text-white md:text-black font-medium";
  const unActiveStateNavLink =
    "flex items-center space-x-2 md:border-b-[0.2rem] md:border-transparent pb-2 dark:text-gray-500 text-gray-400 dark:hover:text-white hover:text-black duration-300 font-medium";

  return (
    <div className="flex space-x-4">
      <Tooltips text="Publish" top="top-10 md:top-12">
        <NavLink
          end={true}
          to={"/dashboard/articles"}
          className={({ isActive }) =>
            isActive ? activeStateNavLink : unActiveStateNavLink
          }
        >
          <SpeakerphoneIcon className="w-6  hidden md:flex" />
          <h1 className="text-lg">Publikasi</h1>
        </NavLink>
      </Tooltips>
      <Tooltips text="Draft" top="top-10 md:top-12">
        <NavLink
          to={"/dashboard/articles/draft"}
          className={({ isActive }) =>
            isActive ? activeStateNavLink : unActiveStateNavLink
          }
        >
          <ArchiveIcon className="w-6  hidden md:flex" />
          <h1 className="text-lg">Arsip</h1>
        </NavLink>
      </Tooltips>
    </div>
  );
}

export default Tab;
