import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
function ListBoxCategory({ data, loading, select, selected, ...rest }) {
  return (
    <Listbox {...rest}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg border dark:border-[#363535] py-2 pl-3  text-left outline-none">
          {loading ? (
            <div className="h-6 w-1/2 animate-pulse bg-gray-500 rounded-md" />
          ) : (
            <span className="block truncate">{selected}</span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute  mt-1 max-h-52  w-full  overflow-auto rounded-md border dark:border-[#363535] bg-white dark:bg-black scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full  text-md z-40">
            {Object.values(data)?.map((c, cIdx) => (
              <Listbox.Option
                key={cIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-green-200 dark:bg-[#055a2b] text-white dark:text-white"
                      : "text-white dark:text-white"
                  }`
                }
                value={c.category}
              >
                <>
                  <span className={`block truncate text-black dark:text-white`}>
                    {c.category}
                  </span>
                  {c.category === select ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2BEF82]">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default ListBoxCategory;
