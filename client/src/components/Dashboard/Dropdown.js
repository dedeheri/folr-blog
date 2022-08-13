import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import {
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
  ArchiveIcon,
} from "@heroicons/react/solid";
import Tooltips from "../Tooltips";
import { Link, useNavigate } from "react-router-dom";
function Dropdown({ id, title }) {
  const router = useNavigate();

  function handleRoute(id, title) {
    const slug = title.replaceAll(" ", "-");

    router({
      pathname: `/dashboard/articles/update/${id}/${slug}`,
    });
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full">
          <Tooltips text={"Lainya"} top="top-8">
            <DotsVerticalIcon
              className="ml-2 -mr-1 h-5 w-5 dark:text-gray-300 text-gray-500 hover:text-black dark:hover:text-white duration-300"
              aria-hidden="true"
            />
          </Tooltips>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="dark:bg-[#252525] z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 dark:divide-[#353535] rounded-md bg-white shadow-lg border dark:border-[#353535] focus:outline-none ">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleRoute(id, title)}
                  className={`${
                    active
                      ? "bg-gray-100 dark:bg-[#434040] text-black dark:text-white"
                      : "text-black dark:text-white"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <PencilAltIcon
                      className="mr-2 h-5 w-5 text-[#2374e1]"
                      aria-hidden="true"
                    />
                  ) : (
                    <PencilAltIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-gray-100 dark:bg-[#434040] text-black dark:text-white"
                      : "text-black dark:text-white"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <ArchiveIcon
                      className="mr-2 h-5 w-5 text-[#2374e1]"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArchiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Arsip
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-gray-100 dark:bg-[#434040] text-black dark:text-white"
                      : "text-black dark:text-white"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <TrashIcon
                      className="mr-2 h-5 w-5 text-[#2374e1]"
                      aria-hidden="true"
                    />
                  ) : (
                    <TrashIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  Hapus
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
