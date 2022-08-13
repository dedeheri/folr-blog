import {
  MailIcon,
  PencilIcon,
  ClockIcon,
  DotsHorizontalIcon,
  UserIcon,
  DotsVerticalIcon,
  PencilAltIcon,
  TrashIcon,
  ArchiveIcon,
  KeyIcon,
} from "@heroicons/react/outline";
import moment from "moment";
import React, { useState } from "react";
import ModalEditProfile from "./ModalEditProfile";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Tooltips from "../Tooltips";

function ProfileHeader({ data, loading }) {
  const [open, setOpen] = useState(false);

  function handleOpenModal() {
    setOpen((prev) => !prev);
  }

  return loading ? (
    <div className="animate-pulse flex items-center space-x-4 ">
      <div className="w-28 h-28  md:w-32 md:h-32  lg:w-40 lg:h-40 rounded-full border-4 dark:border-[#3a3b3c] border-gray-100 bg-gray-100 dark:bg-[#252525]" />
      <div className="space-y-4 ">
        <div className="bg-gray-100 dark:bg-[#252525] w-64 h-7 rounded-md" />
        <div className="bg-gray-100 dark:bg-[#252525] w-80 h-7 rounded-md" />
      </div>
    </div>
  ) : (
    <div className="space-y-4 md:space-y-0">
      <div className="flex items-center space-x-4">
        <img
          className="w-28 h-28  md:w-32 md:h-32  lg:w-40 lg:h-40 rounded-full border-4 dark:border-[#3a3b3c] border-gray-100"
          crossOrigin="anonymous"
          alt={process.env.REACT_APP_URL_API_DEVELOPMENT + data?.data?.imageUrl}
          src={process.env.REACT_APP_URL_API_DEVELOPMENT + data?.data?.imageUrl}
        />
        <div className="w-full md:space-y-1 relative">
          <div className="flex md:justify-between items-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">
              {data?.data?.fullName}
            </h1>
            <div className="hidden md:flex space-x-3">
              <button
                onClick={handleOpenModal}
                className={`lg:h-10 lg:w-52 text-white text-lg font-medium duration-300 rounded-md bg-[#2374e1] flex items-center justify-center p-2 lg:p-0 hover:bg-[#0f5abb] lg:space-x-2`}
              >
                <PencilIcon className="w-5" />
                <h1 className="font-medium">Edit Profil</h1>
              </button>

              {/* dropdown */}
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full">
                    <Tooltips text={"Lainya"} top="top-12">
                      <button className="h-10 w-11 dark:text-white text-black text-lg font-medium duration-300 rounded-md  flex items-center justify-center p-2 lg:p-0  lg:space-x-2 bg-gray-100 dark:bg-[#252525] hover:bg-gray-300 hover:dark:bg-[#363535]">
                        <DotsVerticalIcon className="w-5" />
                      </button>
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
                        <button className="w-full rounded-md duration-300 font-medium text-md hover:bg-gray-100 hover:dark:bg-[#434040] text-black dark:text-white flex p-2 items-center">
                          <KeyIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Ubah Kata Sandi
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              {/* end dropdown */}

              <ModalEditProfile open={open} setOpen={setOpen} data={data} />
            </div>
          </div>

          <div className="text-[#7E7E7E] md:flex items-center md:space-x-3">
            <div className="flex space-x-1">
              <UserIcon className="w-5" />
              <h1 className="text-md md:text-lg font-medium">
                {data?.data?.role}
              </h1>
            </div>
            <div className="flex space-x-1">
              <MailIcon className="w-5" />
              <h1 className="text-md md:text-lg font-medium">
                {data?.data?.email}
              </h1>
            </div>
            <div className="flex space-x-1">
              <ClockIcon className="w-5" />
              <h1 className="text-md md:text-lg font-medium">
                {moment(data?.data?.createdAt).format("ll")}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex space-x-2 md:hidden">
        <button
          onClick={handleOpenModal}
          className="h-10 w-full text-white text-lg font-medium duration-300 rounded-md bg-[#2374e1] flex items-center justify-center p-2 lg:p-0 hover:bg-[#0f5abb] lg:space-x-2"
        >
          <PencilIcon className="w-5" />
          <h1 className="font-medium">Edit Profil</h1>
        </button>

        <button className="h-10 w-14 dark:text-white text-black text-lg font-medium duration-300 rounded-md  flex items-center justify-center p-2 lg:p-0  lg:space-x-2 bg-gray-100 dark:bg-[#252525] hover:bg-gray-300 hover:dark:bg-[#363535]">
          <DotsVerticalIcon className="w-5" />
        </button>

        <ModalEditProfile open={open} setOpen={setOpen} data={data} />
      </div>
    </div>
  );
}

export default ProfileHeader;
