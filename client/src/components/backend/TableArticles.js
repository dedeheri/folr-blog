import moment from "moment";
import React from "react";
import trancute from "../../utils/trancute";

import {
  ArchiveIcon,
  ChartBarIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import DropTableInfo from "./DropTableInfo";
import { Link } from "react-router-dom";

function TableArticles({ data }) {
  const coulums = [
    "Judul",
    "Dilihat",
    "Authour",
    "Tanggal",
    "Kategori",
    "Hastag",
    "Referensi",
  ];

  return (
    <div className="overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="border-b dark:border-[#3A3B3C] ">
            {coulums.map((items, key) => (
              <th
                key={key}
                className="whitespace-nowrap font-medium text-md md:text-lg  text-left text-gray-500 pr-5 pb-3"
              >
                {items}
              </th>
            ))}
            <th className="relative">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        {/* content */}

        <tbody>
          {Object.values(data).map((d, i) => (
            <tr
              key={i}
              className=" text-black  border-b duration-400 dark:border-[#3A3B3C]"
            >
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap flex justify-between items-center space-x-3 group py-1 pr-5">
                <Link to={`/articles/${d._id}/${d.title.replaceAll(" ", "-")}`}>
                  <h1>{trancute(d.title, 90)}</h1>
                </Link>
                <div className="opacity-0 group-hover:opacity-100 duration-300">
                  <button className="hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-1 rounded-md duration-300">
                    <ArchiveIcon className="w-5" />
                  </button>
                  <button className="hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-1 rounded-md duration-300">
                    <ChartBarIcon className="w-5" />
                  </button>
                  <button className="hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-1 rounded-md duration-300">
                    <PencilIcon className="w-5" />
                  </button>
                  <button className="hover:bg-gray-100 dark:hover:bg-[#3A3B3C] p-1 rounded-md duration-300">
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              </td>
              <td className="text-md font-medium whitespace-nowrap text-black dark:text-white py-1 pr-5">
                {d.view}
              </td>
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap py-1 pr-5">
                {d.authour.fullName}
              </td>
              <td className="text-md font-medium  whitespace-nowrap text-black dark:text-white py-1 pr-5">
                {moment(d.createdAt).format("ll")}
              </td>
              <td className="text-md font-medium whitespace-nowrap text-black dark:text-white py-1 pr-5">
                <h1 className="justify-center bg-green-300 dark:bg-green-900 flex items-center rounded-md px-2">
                  {d.category}
                </h1>
              </td>

              <td className="text-md font-medium  whitespace-nowrap text-black dark:text-white py-1 pr-5">
                <div className="flex items-center space-x-1">
                  <h1 className="font-medium text-md md:text-md text-black dark:text-white justify-center bg-gray-300 dark:bg-gray-600 flex items-center rounded-md px-2">
                    {d.hastag[0]}
                  </h1>

                  <DropTableInfo props={d.hastag}>
                    <div className="space-y-1">
                      {d.hastag.map((_, i) => (
                        <h1
                          key={i}
                          className="font-medium text-md md:text-md text-black dark:text-white justify-center bg-gray-300 dark:bg-gray-600 flex items-center rounded-md px-2"
                        >
                          {_}
                        </h1>
                      ))}
                    </div>
                  </DropTableInfo>
                </div>
              </td>
              <td className="text-md font-medium  whitespace-nowrap text-black dark:text-white py-1 pr-5">
                <div className="flex items-center space-x-1">
                  <a href={d.reference[0]} target="_blank" rel="noreferrer">
                    <h1 className="font-medium text-md text-blue-500 hover:text-blue-600 italic">
                      {trancute(d.reference[0], 30)}
                    </h1>
                  </a>
                  <DropTableInfo props={d.reference}>
                    {d.reference.map((_, i) => (
                      <a href={_} key={i} target="_blank" rel="noreferrer">
                        <h1 className="font-medium text-md text-blue-500 hover:text-blue-600 italic">
                          {_}
                        </h1>
                      </a>
                    ))}
                  </DropTableInfo>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableArticles;
