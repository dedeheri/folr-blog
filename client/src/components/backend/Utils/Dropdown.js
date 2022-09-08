import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckIcon, DotsVerticalIcon } from "@heroicons/react/outline";

function Dropdown({ state, set }) {
  function saveAsDraft() {
    set((prev) => ({ ...prev, published: !state }));
  }

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
          <Menu.Items className="absolute z-50 right-0 mt-2 w-64 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="text-gray-900 flex space-x-3 hover:bg-gray-100 w-full items-center cursor-pointer font-medium rounded-md px-2 py-2 text-md">
                <h1>Batal</h1>
              </div>
            </Menu.Item>

            <Menu.Item>
              <div
                onClick={saveAsDraft}
                className={`text-gray-900 flex justify-between hover:bg-gray-100 w-full items-center cursor-pointer font-medium rounded-md px-2 py-2 text-md`}
              >
                <div className="flex  space-x-3 ">
                  <h1>Simpan sebagai draft</h1>
                </div>
                {state === false && <CheckIcon className="w-4" />}
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="text-gray-900 flex space-x-3 hover:bg-gray-100 w-full items-center cursor-pointer font-medium rounded-md px-2 py-2 text-md">
                <h1>Masukan</h1>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Dropdown;
