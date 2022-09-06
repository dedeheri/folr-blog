import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { DotsVerticalIcon } from "@heroicons/react/outline";

function Dropdown() {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="hover:bg-gray-100 hover:dark:bg-[#3A3B3C]  p-2 rounded-full duration-300">
            <DotsVerticalIcon className="w-5 h-5" />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                  >
                    Batal
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-md`}
                  >
                    Simpan sebagai draft
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Dropdown;