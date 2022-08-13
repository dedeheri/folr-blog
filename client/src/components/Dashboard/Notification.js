import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

// icons
import { BellIcon } from "@heroicons/react/outline";
import Tooltips from "../Tooltips";

function Notification() {
  return (
    <Popover className="relative pt-2">
      <Popover.Button className="group items-center rounded-full relative">
        <Tooltips text={"Notifikasi"} top="top-12">
          <div className="bg-gray-100 dark:bg-[#252525] hover:bg-gray-300 hover:dark:bg-[#363535] p-2 duration-300 rounded-full">
            <BellIcon
              data-tooltip-target="tooltip-default"
              type="button"
              className="w-6 text-gray-500 dark:text-gray-400"
            />
          </div>
        </Tooltips>

        {false && (
          <div className="absolute top-0.5 right-0 bg-red-500 h-2 w-2 md:h-3 md:w-3 rounded-full" />
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
            <div className="bg-white dark:bg-[#242526] space-y-1">
              <h1 className="text-xl text-center py-10">
                Tidak ada notifikasi
              </h1>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Notification;
