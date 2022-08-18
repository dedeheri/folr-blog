import {
  ArchiveIcon,
  EyeIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import { Popover, Tab, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import api from "../../apis/api";
import config from "../../apis/config";
import { createSearchParams, useNavigate } from "react-router-dom";
import { AdjustmentsIcon, SearchIcon } from "@heroicons/react/outline";

function Filter() {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [resultSearchTerm, setResultSearchTerm] = useState("");

  useEffect(() => {
    async function getCategory() {
      try {
        const { data } = await api.get("api/v1/category", config);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }

    setLoading(true);
    getCategory();
  }, [searchTerm]);

  useEffect(() => {
    const term = data?.data?.filter((d) =>
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResultSearchTerm(term);
  }, [data, searchTerm]);

  function handleFilterFeatured(value) {
    navigate({
      search: `${createSearchParams({
        filter: value,
      })}`,
    });
  }

  function handleFilterTopics(value) {
    navigate({
      search: `${createSearchParams({
        category: value,
      })}`,
    });
  }

  const activeStateNavLink =
    "flex items-center space-x-2 border-b-[0.2rem] border-[#2374e1] px-2 pt-3 pb-1";
  const unActiveStateNavLink =
    "flex items-center space-x-2 border-b-[0.2rem] border-transparent px-2 pt-3 pb-1";

  return (
    <Popover className="relative pt-1">
      <Popover.Button className="group items-center">
        <div className="h-10 md:bg-gray-200 md:dark:bg-[#252525] md:hover:bg-gray-300 md:hover:dark:bg-[#363535] duration-300 md:px-4 rounded-md flex space-x-3 items-center">
          <AdjustmentsIcon className="w-7 md:w-6" />
          <h1 className="font-medium text-lg hidden md:block">Sortir</h1>
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
        <Popover.Panel className="absolute md:right-0 -right-4 z-10 mt-2 w-80 px-4 sm:px-0 ">
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
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoFocus={true}
                          className="h-10 w-full bg-transparent outline-none px-2 placeholder:font-medium"
                          placeholder="Cari Kategori..."
                        />
                      </div>

                      {/* list */}
                      <div className="h-52 overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
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
                      </div>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <Fragment>
                      <div className="p-3">
                        <div
                          onClick={() => handleFilterFeatured("view")}
                          className="p-1 hover:dark:bg-[#363535] hover:bg-gray-100 rounded-md duration-200 flex items-center space-x-2 cursor-pointer"
                        >
                          <div className="bg-green-500 rounded-md p-1">
                            <SortAscendingIcon className="w-4 text-white dark:text-black" />
                          </div>
                          <h1 className="font-medium text-lg">Terbaru</h1>
                        </div>

                        <div
                          onClick={() => handleFilterFeatured("view")}
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

export default Filter;
