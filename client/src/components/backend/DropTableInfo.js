import React from "react";

import { Popover, Tab, Transition } from "@headlessui/react";
import { Fragment } from "react";

function DropTableInfo({ props, children }) {
  return (
    <Popover className="relative">
      <Popover.Button className="group items-center">
        <h1 className="font-medium text-md md:text-md text-white justify-center bg-red-500 dark:bg-red-700 hover:dark:bg-red-800 duration-300 rounded-full px-2">
          {props.length - 1 === 0 ? "" : props.length + " +"}
        </h1>
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
        <Popover.Panel className="absolute right-0 z-10 mt-1 shadow-lg w-auto px-4 sm:px-0 ">
          <div className="overflow-hidden rounded-lg border dark:border-[#353535]">
            <div className="bg-white dark:bg-[#242526] ">
              <Tab.Group>
                <Tab.Panels>
                  <Tab.Panel>
                    <div className="px-3 py-1 ">{children}</div>
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

export default DropTableInfo;
