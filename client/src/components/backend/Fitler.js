import React from "react";

import {
  ArchiveIcon,
  EyeIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  AdjustmentsIcon,
  SearchIcon,
} from "@heroicons/react/solid";

import { Popover, Tab, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const activeStateNavLink =
  "flex items-center space-x-2 border-b-[0.2rem] border-[#2374e1] px-2 pt-3 pb-1";
const unActiveStateNavLink =
  "flex items-center space-x-2 border-b-[0.2rem] border-transparent px-2 pt-3 pb-1";

function Fitler() {
  const navigate = useNavigate();
  function handleFilterFeatured(key, value) {
    navigate({
      search: `${createSearchParams({
        [key]: value,
      })}`,
    });
  }

  return (
    <Popover className="relative">
      <Popover.Button className="group items-center">
        <div className="flex space-x-2 items-center text-gray-500 hover:text-[#2374E1] duration-300">
          <AdjustmentsIcon className="w-5" />
          <h1 className="font-medium text-md md:text-lg">Sortir</h1>
        </div>
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
        <Popover.Panel className="absolute left-0 z-10 mt-2 w-80 px-4 sm:px-0 ">
          <div className="overflow-hidden rounded-lg border dark:border-[#353535]">
            <div className="bg-white dark:bg-[#242526] ">
              <Tab.Group>
                <Tab.List className="flex space-x-4 border-b dark:border-[#353535] px-2">
                  <Tab
                    className={({ selected }) =>
                      selected ? activeStateNavLink : unActiveStateNavLink
                    }
                  >
                    <h1 className="font-medium text-lg">Kategori</h1>
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected ? activeStateNavLink : unActiveStateNavLink
                    }
                  >
                    <h1 className="font-medium text-lg">Berdasarkan</h1>
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <div className="space-y-3 p-3">
                      {/* search */}
                      <div className="w-full flex px-2 border-b dark:border-[#353535]">
                        <SearchIcon className="w-7 md:w-6 " />
                        <input
                          autoFocus={true}
                          className="h-10 w-full bg-transparent outline-none px-2 placeholder:font-medium"
                          placeholder="Cari Kategori..."
                        />
                      </div>

                      {/* list */}
                      {/* <div className="h-52 overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
                        {loading ? (
                          <div className="space-y-3 animate-pulse">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="bg-gray-200 dark:bg-[#353535] h-8 rounded-md"
                              />
                            ))}
                          </div>
                        ) : error ? (
                          <h1 className="font-medium text-lg bg-red-500 p-1 rounded-md">
                            Terjadi Kesalahan
                          </h1>
                        ) : resultSearchTerm?.length === 0 ? (
                          <h1 className="font-medium text-xl h-44 flex justify-center items-center text-gray-500">
                            Pencarian tidak ditemukan
                          </h1>
                        ) : (
                          resultSearchTerm?.map((l, i) => (
                            <div
                              key={i}
                              className="p-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md duration-200 cursor-pointer"
                            >
                              <div
                                onClick={() => handleFilterTopics(l.category)}
                                className="font-medium text-lg"
                              >
                                {l.category}
                              </div>
                            </div>
                          ))
                        )}
                      </div> */}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <Fragment>
                      <div className="p-3">
                        <div
                          onClick={() =>
                            handleFilterFeatured("createdAt", "Ascending")
                          }
                          className="p-1 hover:dark:bg-[#363535] hover:bg-gray-100 rounded-md duration-200 flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="bg-green-500 rounded-md p-1">
                            <SortAscendingIcon className="w-4 text-white dark:text-black" />
                          </div>
                          <h1 className="font-medium text-lg">Terbaru</h1>
                        </div>

                        <div
                          onClick={() =>
                            handleFilterFeatured("createdAt", "Descending")
                          }
                          className="p-1 hover:dark:bg-[#363535] hover:bg-gray-100 rounded-md duration-200 flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="bg-gray-500 rounded-md p-1">
                            <SortDescendingIcon className="w-4 text-white dark:text-black" />
                          </div>
                          <h1 className="font-medium text-lg">Terlama</h1>
                        </div>

                        <div
                          onClick={() => handleFilterFeatured("view")}
                          className="p-1 hover:dark:bg-[#363535] hover:bg-gray-100 rounded-md duration-200 flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="bg-cyan-500 rounded-md p-1">
                            <ArchiveIcon className="w-4 text-white dark:text-black" />
                          </div>
                          <h1 className="font-medium text-lg">Arsip</h1>
                        </div>
                      </div>

                      <div className="border-b dark:border-[#353535]" />

                      <div className="p-3">
                        <div
                          onClick={() => handleFilterFeatured("view")}
                          className="p-1 hover:dark:bg-[#363535] hover:bg-gray-100 rounded-md duration-200 flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="bg-[#1781DD] rounded-md p-1">
                            <EyeIcon className="w-4 text-white dark:text-black" />
                          </div>
                          <h1 className="font-medium text-lg">Lihat</h1>
                        </div>
                        <div
                          onClick={() => handleFilterFeatured("view")}
                          className="p-1 hover:dark:bg-[#363535] hover:bg-gray-100 rounded-md duration-200 flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="bg-[#F68709] rounded-md p-1">
                            <ThumbUpIcon className="w-4 text-white dark:text-black" />
                          </div>
                          <h1 className="font-medium text-lg">Suka</h1>
                        </div>
                        <div
                          onClick={() => handleFilterFeatured("view")}
                          className="p-1 hover:dark:bg-[#363535] hover:bg-gray-100 rounded-md duration-200 flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="bg-[#F7506C] rounded-md p-1">
                            <ThumbDownIcon className="w-4 text-white dark:text-black" />
                          </div>
                          <h1 className="font-medium text-lg">Suka</h1>
                        </div>
                      </div>
                    </Fragment>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Fitler;
