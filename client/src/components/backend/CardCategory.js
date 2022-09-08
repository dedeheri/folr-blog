import { PencilIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CardCategory({ data }) {
  const navigate = useNavigate();
  const [overview, setOverview] = useState({
    show: false,
    category: "",
  });

  function handleOverview(condition, props) {
    if (overview.category !== props) {
      setOverview({ show: condition, category: props });
      navigate({
        search: props,
      });
    }
  }

  return (
    <>
      <div
        onClick={() => handleOverview(true, data.category)}
        className="border cursor-pointer  group dark:border-[#3A3B3C] p-5 rounded-md flex justify-between"
      >
        <h1 className="text-lg font-medium">{data.category}</h1>

        <div className="flex opacity-0 group-hover:opacity-100 duration-300">
          <button className="hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-2 rounded-full duration-300">
            <PencilIcon className="w-5" />
          </button>
          <button className="hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-2 rounded-full duration-300">
            <TrashIcon className="w-5" />
          </button>
        </div>
      </div>

      <div
        className={`fixed duration-300 right-0 top-0 z-40 bg-[#18191a] border-l dark:border-[#494949] w-96 h-screen ${
          overview.show ? "translate-x-auto" : "translate-x-full"
        }`}
      >
        {/* close */}
        <div className="flex items-center justify-between p-4 border-b dark:border-[#494949]">
          <h1 className="text-xl font-medium">{overview.category}</h1>
          <button
            onClick={() => handleOverview(false)}
            className="hover:bg-[#494949] duration-300 rounded-full p-1"
          >
            <XIcon className="w-6" />
          </button>
        </div>

        <div className="p-4">
          <h1>sidebar</h1>
        </div>
      </div>
    </>
  );
}

export default CardCategory;
