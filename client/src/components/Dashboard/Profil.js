import React, { useEffect, useState } from "react";

import { Popover, Switch, Transition } from "@headlessui/react";
import { Fragment } from "react";

// icons
import {
  GlobeAltIcon,
  LogoutIcon,
  MoonIcon,
  UserIcon,
} from "@heroicons/react/outline";
import Tooltips from "../Tooltips";

import cookies from "js-cookie";
import i18next from "i18next";
import { Link, useNavigate } from "react-router-dom";

function Profil({ data, loading, theme, setTheme }) {
  const navigate = useNavigate();
  const languages = [
    {
      code: "id",
      name: "Indonesia",
      country_code: "id",
    },
    {
      code: "en",
      name: "English",
      country_code: "en",
    },
  ];

  const [changeState, setChangeState] = useState("id");
  const currentLanguageCode = cookies.get("i18next");
  const currentLanguage = languages.find((l) => {
    return l.code === currentLanguageCode;
  });

  function handleChange(props) {
    i18next.changeLanguage(props);
    setChangeState(props);
  }

  return (
    <Popover className="relative pt-2">
      <Popover.Button className="group items-center rounded-full">
        {loading ? (
          <div className="w-10 h-10 animate-pulse dark:bg-[#3a3b3c] bg-gray-100 rounded-full " />
        ) : (
          <Tooltips text={"Profil"} top="top-12">
            <img
              className="w-9 h-9 rounded-full"
              crossOrigin="anonymous"
              alt={process.env.REACT_APP_URL_API_DEVELOPMENT + data?.imageUrl}
              src={process.env.REACT_APP_URL_API_DEVELOPMENT + data?.imageUrl}
            />
          </Tooltips>
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
            {loading ? (
              <div className="animate-pulse space-y-3 px-4 py-3 bg-white dark:bg-[#242526]">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="dark:bg-[#3a3b3c] rounded-md bg-gray-100 h-7 w-full"
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#242526] space-y-1">
                <Link
                  to={"me"}
                  className="flex items-center  space-x-3 hover:bg-gray-100 dark:hover:bg-[#3a3b3c] duration-200 px-4 py-1 cursor-pointer"
                >
                  <UserIcon className="w-6" />
                  <h1 className="text-lg">{data?.fullName}</h1>
                </Link>

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
                    onClick={() => setTheme((prev) => !prev)}
                    className="flex items-center space-x-3"
                  >
                    <GlobeAltIcon className="w-6" />
                    <h1 className="text-lg">Bahasa</h1>
                  </button>

                  <div className="flex space-x-1 items-center bg-gray-200 dark:bg-[#353535] rounded-md">
                    {languages.map((lang, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleChange(lang.code);
                        }}
                        className={`${
                          currentLanguage.code === lang.code
                            ? " bg-green-500"
                            : ""
                        } rounded-md px-2`}
                      >
                        {lang.country_code}
                      </button>
                    ))}
                  </div>
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
  );
}

export default Profil;
