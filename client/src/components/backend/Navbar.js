import React, { Fragment } from "react";
import { Popover, Switch, Transition } from "@headlessui/react";

// dom
import { Link } from "react-router-dom";

// image
import { logoDark, logoLight } from "../../assets/image";

// icon
import {
  BellIcon,
  GlobeAltIcon,
  LogoutIcon,
  MenuIcon,
  SearchIcon,
  MoonIcon,
} from "@heroicons/react/outline";

function Navbar({ user, theme, setTheme, handleSidebar }) {
  return (
    <div className="flex justify-between items-center h-14 z-40 sticky top-0 bg-white dark:bg-[#18191a] md:h-16 border-b dark:border-[#3A3B3C] px-4">
      {/* section 1 */}
      <div className="flex items-center space-x-2 md:space-x-3">
        <button className="md:flex hidden" onClick={handleSidebar}>
          <MenuIcon className="w-6 md:w-7" />
        </button>

        {theme === "dark" ? (
          <img src={logoLight} alt="logo" className="w-32 md:w-36" />
        ) : (
          <img src={logoDark} alt="logo" className="w-32" />
        )}
      </div>
      {/* section 2 */}
      <div className="flex items-center space-x-1 md:space-x-2">
        <button className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] hover:dark:bg-[#555555]  p-2 rounded-full duration-300">
          <SearchIcon className="w-5 md:w-6" />
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] hover:dark:bg-[#555555]  p-2 rounded-full duration-300">
          <BellIcon className="w-5 md:w-6" />
        </button>

        <Popover className="relative pt-2">
          <Popover.Button className="group items-center rounded-full">
            {user.loading ? (
              <div className="w-10 h-10 animate-pulse dark:bg-[#3a3b3c] bg-gray-100 rounded-full " />
            ) : (
              <img
                className="w-9 h-9 md:w-10 md:h-10 rounded-full"
                crossOrigin="anonymous"
                alt={process.env.REACT_APP_URL_API_DEVELOPMENT + user?.imageUrl}
                src={process.env.REACT_APP_URL_API_DEVELOPMENT + user?.imageUrl}
              />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 mt-2 w-80 px-4 sm:px-0 ">
              <div className="overflow-hidden rounded-lg border dark:border-[#353535]">
                {user.loading ? (
                  <div className="animate-pulse space-y-3 px-4 py-3 bg-white dark:bg-[#242526]">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="dark:bg-[#3a3b3c] rounded-md bg-gray-100 h-7 w-full"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#242526] ">
                    <Link
                      to={"me"}
                      className="flex items-center  space-x-3 hover:bg-gray-100 dark:hover:bg-[#3a3b3c] duration-200 px-4 py-1 cursor-pointer"
                    >
                      <img
                        className="w-6 h-6 rounded-full"
                        crossOrigin="anonymous"
                        alt={
                          process.env.REACT_APP_URL_API_DEVELOPMENT +
                          user?.imageUrl
                        }
                        src={
                          process.env.REACT_APP_URL_API_DEVELOPMENT +
                          user?.imageUrl
                        }
                      />
                      <h1 className="text-lg">{user?.fullName}</h1>
                    </Link>

                    <div className="border-t dark:border-[#353535]" />

                    {/* dark mode */}
                    <div className="flex justify-between items-center px-4 py-1 hover:bg-gray-100 dark:hover:bg-[#3a3b3c] duration-200">
                      <button
                        onClick={() => setTheme((prev) => !prev)}
                        className="flex items-center space-x-3 "
                      >
                        <MoonIcon className="w-6" />
                        <h1 className="text-lg">Tema</h1>
                      </button>

                      <Switch
                        checked={theme}
                        onChange={setTheme}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-[#353535]"
                      >
                        <span
                          className={`${
                            theme
                              ? "translate-x-6 bg-green-500"
                              : "translate-x-1 bg-red-500"
                          } inline-block h-4 w-4 transform rounded-full duration-500`}
                        />
                      </Switch>
                    </div>

                    <div className="border-t dark:border-[#353535]" />

                    {/* dark mode */}
                    <div className="flex justify-between items-center px-4 py-1 ">
                      <button
                        // onClick={() => setTheme((prev) => !prev)}
                        className="flex items-center space-x-3"
                      >
                        <GlobeAltIcon className="w-6" />
                        <h1 className="text-lg">Bahasa</h1>
                      </button>
                    </div>

                    <div className="border-t dark:border-[#353535]" />

                    <div className="flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-[#252525] duration-200 px-4 py-1 cursor-pointer">
                      <LogoutIcon className="w-6" />
                      <h1 className="text-lg">Keluar</h1>
                    </div>
                  </div>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;
