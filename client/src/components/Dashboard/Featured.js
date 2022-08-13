import {
  DocumentTextIcon,
  EyeIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";
import React from "react";

import millify from "millify";

function Featured({ data }) {
  return (
    <div className="flex w-full space-x-2 overflow-x-scroll scrollbar-hide">
      {/* artikel */}
      <div className="border dark:border-[#353535] rounded-xl  px-3 py-8 md:py-10 lg:py-12 w-full">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <DocumentTextIcon className="w-16 text-[#25B0B9]" />
          <div>
            <h3 className="font-roboto text-xl">
              {millify(data?.data?.articles || 0)}
            </h3>
            <h1 className="font-roboto font-medium text-lg text-gray-400">
              Artikel
            </h1>
          </div>
        </div>
      </div>
      {/* like */}
      <div className="border dark:border-[#353535] rounded-xl px-3 py-8 md:py-10 lg:py-12 w-full">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <ThumbUpIcon className="w-16 text-[#F68709]" />
          <div>
            <h3 className="font-roboto text-xl">
              {millify(data?.data?.like || 0)}
            </h3>
            <h1 className="font-roboto font-medium text-lg text-gray-400">
              Suka
            </h1>
          </div>
        </div>
      </div>
      {/* dislike */}
      <div className="border dark:border-[#353535] rounded-xl px-3 py-8 md:py-10 lg:py-12 w-full">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <ThumbDownIcon className="w-16 text-[#F7506C]" />
          <div>
            <h3 className="font-roboto text-xl">
              {millify(data?.data?.dislike || 0)}
            </h3>
            <h1 className="font-roboto font-medium text-lg text-gray-400 whitespace-nowrap">
              Tidak Suka
            </h1>
          </div>
        </div>
      </div>
      {/* view */}
      <div className="border dark:border-[#353535] rounded-xl px-5 py-8 md:py-10 lg:py-12 w-full">
        <div className="flex items-center justify-center space-x-4 md:space-x-6 lg:space-x-8">
          <EyeIcon className="w-16 text-[#1781DD]" />
          <div>
            <h3 className="font-roboto text-xl">
              {millify(data?.data?.view || 0)}
            </h3>
            <h1 className="font-roboto font-medium text-lg text-gray-400">
              Dilihat
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
