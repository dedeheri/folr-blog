import { NavLink } from "react-router-dom";
import { logo, logoMobile, logoWhite, logoMobileLight } from "../assets/image";

// icons
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
import Navbar from "./Dashboard/Navbar";

function Container({ theme, data, loading, children }) {
  const activeStateNavLink =
    "flex items-center space-x-2 md:bg-gray-100 md:dark:bg-[#252525] text-black dark:text-white  p-1 rounded-md text-black font-medium";
  const unActiveStateNavLink =
    "flex items-center space-x-2 dark:text-gray-500 text-gray-400 dark:hover:text-white hover:text-black duration-300 font-medium  p-1";

  return (
    <div className="flex ">
      {/* sidebar */}
      <div className="h-screen fixed w-20 md:w-52 dark:border-[#353535] border-r bg-white dark:bg-[#18191a] px-4 py-6">
        {/* logo */}
        <div>
          {theme === "dark" ? (
            <>
              <img src={logoWhite} className="w-36 hidden md:block" />
              <img src={logoMobileLight} className="w-10  block md:hidden" />
            </>
          ) : (
            <>
              <img src={logo} className="w-36 hidden md:block" />
              <img src={logoMobile} className="w-10  block md:hidden" />
            </>
          )}
          {/* navbar */}
          <div className="space-y-3 md:space-y-1 pt-11">
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
                    <HomeIconSolid className="w-7" />
                    <h1 className="text-lg hidden md:flex">Beranda</h1>
                  </>
                ) : (
                  <>
                    <HomeIcon className="w-7" />
                    <h1 className="text-lg hidden md:flex">Beranda</h1>
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
                    <DocumentTextIconSolid className="w-7" />
                    <h1 className="text-lg hidden md:flex">Artikel</h1>
                  </>
                ) : (
                  <>
                    <DocumentTextIcon className="w-7" />
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
                    <ViewGridAddIconSolid className="w-7" />
                    <h1 className="text-lg hidden md:flex">Kategori</h1>
                  </>
                ) : (
                  <>
                    <ViewGridAddIcon className="w-7" />
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
                    <TrendingUpIconSolid className="w-7" />
                    <h1 className="text-lg hidden md:flex">Trending</h1>
                  </>
                ) : (
                  <>
                    <TrendingUpIcon className="w-7" />
                    <h1 className="text-lg hidden md:flex">Trending</h1>
                  </>
                )
              }
            </NavLink>
          </div>
        </div>
      </div>

      <div className="w-full pl-20 md:pl-52 ">
        <Navbar theme={theme} data={data} loading={loading} />

        {children}
      </div>
    </div>
  );
}

export default Container;
