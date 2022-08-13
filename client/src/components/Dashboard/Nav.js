import {
  HomeIcon,
  DocumentTextIcon,
  TrendingUpIcon,
  CogIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";

import {
  HomeIcon as HomeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  TrendingUpIcon as TrendingUpIconSolid,
  CogIcon as CogIconSolid,
  ViewGridAddIcon as ViewGridAddIconSolid,
} from "@heroicons/react/solid";

import React from "react";
import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

function Nav() {
  const { t } = useTranslation();

  const activeStateNavLink =
    "flex items-center space-x-2 md:border-b-[0.2rem] md:border-[#2374e1] pb-2 text-[#2374e1] md:dark:text-white md:text-black font-medium";
  const unActiveStateNavLink =
    "flex items-center space-x-2 md:border-b-[0.2rem] md:border-transparent pb-2 dark:text-gray-500 text-gray-400 dark:hover:text-white hover:text-black duration-300 font-medium";

  return (
    <div className="mt-5 md:mt-6 lg:mt-7 border-b dark:border-[#353535]">
      <div className="max-w-7xl mx-auto md:flex md:items-center md:space-x-5 md:justify-between">
        <div className="flex md:hidden items-center space-x-5 justify-between px-4">
          <NavLink
            to={"/dashboard"}
            end={true}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <HomeIconSolid className="w-6" />
              ) : (
                <HomeIcon className="w-6" />
              )
            }
          </NavLink>
          <NavLink
            to={"articles"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <DocumentTextIconSolid className="w-6" />
              ) : (
                <DocumentTextIcon className="w-6" />
              )
            }
          </NavLink>

          <NavLink
            to={"category"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <ViewGridAddIconSolid className="w-6" />
              ) : (
                <ViewGridAddIcon className="w-6" />
              )
            }
          </NavLink>
          <NavLink
            to={"trends"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <TrendingUpIconSolid className="w-6" />
              ) : (
                <TrendingUpIcon className="w-6" />
              )
            }
          </NavLink>
          <NavLink
            to={"setting"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <CogIconSolid className="w-6" />
              ) : (
                <CogIcon className="w-6" />
              )
            }
          </NavLink>
        </div>

        <div className="md:flex space-x-5 hidden items-start">
          <NavLink
            to={"/dashboard"}
            end={true}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <HomeIconSolid className="w-6" />
                  <h1 className="text-lg hidden md:flex">{t("Beranda")}</h1>
                </>
              ) : (
                <>
                  <HomeIcon className="w-6" />
                  <h1 className="text-lg hidden md:flex">{t("Beranda")}</h1>
                </>
              )
            }
          </NavLink>
          <NavLink
            to={"articles"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <DocumentTextIconSolid className="w-6" />
                  <h1 className="text-lg hidden md:flex">Artikel</h1>
                </>
              ) : (
                <>
                  <DocumentTextIcon className="w-6" />
                  <h1 className="text-lg hidden md:flex">Artikel</h1>
                </>
              )
            }
          </NavLink>

          <NavLink
            to={"category"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <ViewGridAddIconSolid className="w-6" />
                  <h1 className="text-lg hidden md:flex">Kategori</h1>
                </>
              ) : (
                <>
                  <ViewGridAddIcon className="w-6" />
                  <h1 className="text-lg hidden md:flex">Kategori</h1>
                </>
              )
            }
          </NavLink>
          <NavLink
            to={"trends"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <TrendingUpIconSolid className="w-6" />
                  <h1 className="text-lg hidden md:flex">Trending</h1>
                </>
              ) : (
                <>
                  <TrendingUpIcon className="w-6" />
                  <h1 className="text-lg hidden md:flex">Trending</h1>
                </>
              )
            }
          </NavLink>
        </div>

        <div className="hidden md:flex">
          <NavLink
            to={"setting"}
            className={({ isActive }) =>
              isActive ? activeStateNavLink : unActiveStateNavLink
            }
          >
            {({ isActive }) =>
              isActive ? (
                <>
                  <CogIcon className="w-6" />
                  <h1 className="text-lg hidden md:flex">Pengaturan</h1>
                </>
              ) : (
                <>
                  <CogIconSolid className="w-6" />
                  <h1 className="text-lg hidden md:flex">Pengaturan</h1>
                </>
              )
            }
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Nav;
