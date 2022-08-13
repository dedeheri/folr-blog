import {
  DocumentTextIcon,
  KeyIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";

import {
  DocumentTextIcon as DocumentTextIconSolid,
  KeyIcon as KeyIconSolid,
  TrendingUpIcon as TrendingUpIconSolid,
} from "@heroicons/react/solid";

import React from "react";
import { NavLink } from "react-router-dom";

function NavProfile({ params }) {
  const activeStateNavLink =
    "flex items-center space-x-2 border-b-[0.2rem] border-[#2374e1] pb-2 text-[#2374e1] font-medium";
  const unActiveStateNavLink =
    "flex items-center space-x-2 border-b-[0.2rem] border-transparent pb-2 dark:text-gray-500 text-gray-400 dark:hover:text-white hover:text-black font-medium";
  return (
    <div>
      <div className="flex space-x-4">
        <NavLink
          end={true}
          to={`/dashboard/me`}
          className={({ isActive }) =>
            isActive ? activeStateNavLink : unActiveStateNavLink
          }
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <DocumentTextIconSolid className="w-5 md:w-6" />
                <h1 className="text-md md:text-lg">Artikel</h1>
              </>
            ) : (
              <>
                <DocumentTextIcon className="w-5 md:w-6" />
                <h1 className="text-md md:text-lg">Artikel</h1>
              </>
            )
          }
        </NavLink>

        <NavLink
          to={`/dashboard/me/trends`}
          className={({ isActive }) =>
            isActive ? activeStateNavLink : unActiveStateNavLink
          }
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <TrendingUpIconSolid className="w-5 md:w-6" />
                <h1 className="text-md md:text-lg">Trending</h1>
              </>
            ) : (
              <>
                <TrendingUpIcon className="w-5 md:w-6" />
                <h1 className="text-md md:text-lg">Trending</h1>
              </>
            )
          }
        </NavLink>
        <NavLink
          to={`/dashboard/me/session`}
          className={({ isActive }) =>
            isActive ? activeStateNavLink : unActiveStateNavLink
          }
        >
          {({ isActive }) =>
            isActive ? (
              <>
                <KeyIconSolid className="w-5 md:w-6" />
                <h1 className="text-md md:text-lg">Riwayat Masuk</h1>
              </>
            ) : (
              <>
                <KeyIcon className="w-5 md:w-6" />
                <h1 className="text-md md:text-lg">Riwayat Masuk</h1>
              </>
            )
          }
        </NavLink>
      </div>
    </div>
  );
}

export default NavProfile;
