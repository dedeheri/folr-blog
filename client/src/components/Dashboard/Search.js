import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import apis from "../../apis/api";
import config from "../../apis/config";

// icon
import {
  ArrowRightIcon,
  PencilIcon,
  SearchIcon,
  TrashIcon,
  ViewGridAddIcon,
  XIcon,
  DocumentTextIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import Tooltips from "../Tooltips";
function Search() {
  // state
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      async function getArticles() {
        try {
          setFetching(true);
          const { data } = await apis.post(
            "api/v1/articles/search",
            { searchTerm },
            config
          );
          setData(data);
          setFetching(false);
        } catch (error) {
          setFetching(false);
          setError(error.response.data);
        }
      }
      getArticles();
    }
  }, [searchTerm]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    function documentKey(e) {
      if (e.altKey && e.which == 65) {
        openModal();
      }
    }
    document.addEventListener("keyup", documentKey);
  }, []);

  return (
    <div>
      <Tooltips top={"top-12"} text="Pencarian">
        <div
          onClick={openModal}
          className="h-10 bg-gray-100 group  dark:bg-[#252525] hover:bg-gray-300 hover:dark:bg-[#363535] w-60 items-center hidden md:flex justify-between px-2 rounded-md cursor-pointer text-gray-400"
        >
          <div className="flex space-x-2">
            <SearchIcon className="w-7 md:w-6 " />
            <h1 className="font-medium text-md">Pencarian</h1>
          </div>
          <h1 className="font-medium group-hover:bg-[#0f5abb] duration-300 text-md text-white px-2 py-0.5 rounded-md bg-[#2374e1]">
            CTRL + K
          </h1>
        </div>
      </Tooltips>

      {/* mobile */}
      <Tooltips top={"top-12"} text="Pencarian">
        <div
          onClick={openModal}
          className="cursor-pointer block md:hidden bg-gray-100 hover:bg-gray-200 dark:bg-[#3a3b3c] dark:hover:bg-[#404142] p-2 rounded-full"
        >
          <SearchIcon className="w-6 md:w-8 text-gray-500 dark:text-gray-400 hover:text-[#0f5abb] duration-300" />
        </div>
      </Tooltips>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
          </Transition.Child>

          <div className="fixed right-0 left-0 top-20 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-y-auto rounded-xl bg-[#242526] border border-[#3a3b3c] text-left align-middle shadow-xl transition-all text-white">
                  {/* input */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <SearchIcon className="w-5 text-gray-400" />
                      <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        autoFocus={true}
                        placeholder="Pencarian..."
                        className="bg-transparent outline-none placeholder:font-medium"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      {fetching && (
                        <svg
                          className="animate-spin h-6 w-6 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}
                      <div className="flex space-x-3">
                        {searchTerm && (
                          <button className="bg-[#3a3b3c] rounded-full p-1">
                            <XIcon
                              onClick={() => setSearchTerm("")}
                              className="w-5 text-gray-300 rounded-lg"
                            />
                          </button>
                        )}

                        <button onClick={closeModal}>
                          <h1 className="bg-[#3a3b3c] px-3 py-0.5 rounded-lg text-white font-medium">
                            ESC
                          </h1>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* border bottum */}
                  <div className="border-b border-[#353535]" />

                  {/* result */}

                  {!searchTerm ? (
                    <div className="h-44 flex items-center justify-center">
                      <h1 className="font-medium text-xl text-gray-500">
                        Ketik sesuatu untuk mencari hasil
                      </h1>
                    </div>
                  ) : (
                    <div className=" h-[32rem] md:h-[35rem] scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
                      {data?.category?.length === 0 ||
                      data?.articles?.length === 0 ? null : (
                        <div className="px-3 py-2 space-y-1">
                          <div className="flex">
                            <DocumentTextIcon className="w-5" />
                            <h1
                              className="font-medium text-lg w-32 px-2
                          rounded-lg"
                            >
                              Artikel
                            </h1>
                          </div>

                          {data?.articles?.map(({ _id, title }) => (
                            <Link
                              onClick={closeModal}
                              to={`/dashboard/articles/${_id}/${title.replaceAll(
                                " ",
                                "-"
                              )}`}
                              key={_id}
                              className="flex items-center space-x-3 py-2 px-2 bg-[#3b3b3b] hover:bg-[#2374e1] rounded-md cursor-pointer duration-300  group"
                            >
                              <div className="flex justify-between w-full">
                                <h1 className="font-medium">{title}</h1>
                                <ArrowRightIcon className="w-5 -rotate-45 text-gray-400 group-hover:text-blue-900" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {data?.category?.length === 0 ||
                      data?.articles?.length === 0 ? null : (
                        <div className="px-3 py-2 space-y-1">
                          <div className="flex">
                            <ViewGridAddIcon className="w-5" />
                            <h1
                              className="font-medium text-lg w-32 px-2
                          rounded-lg"
                            >
                              Kategori
                            </h1>
                          </div>

                          {data?.category?.map(({ _id, category }) => (
                            <div
                              key={_id}
                              className="flex justify-between w-full  items-center space-x-3 py-2 px-2 bg-[#3b3b3b] hover:bg-[#2374e1] rounded-md duration-300  group"
                            >
                              <h1 className="font-medium">{category}</h1>
                              <div className="flex space-x-2 cursor-pointer items-center">
                                <PencilIcon className="w-5 text-gray-400 group-hover:text-green-500 duration-300" />
                                <TrashIcon className="w-5 text-gray-400 group-hover:text-red-500 duration-300" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {data?.category?.length === 0 ||
                      data?.articles?.length === 0 ? (
                        <div className="h-44 flex  items-center justify-center">
                          <h1 className="font-medium text-xl text-gray-500">
                            Tidak ada hasil untuk{" "}
                            <span className="text-white">"{searchTerm}"</span>
                          </h1>
                        </div>
                      ) : null}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default Search;
