import React from "react";

import trancute from "../../../utils/trancute";
import moment from "moment";

function DCard({ data }) {
  return (
    <div className="md:flex lg:space-x-4 lg:items-center border md:border-none rounded-md dark:border-[#3A3B3C] ">
      {/* image */}
      <img
        src={process.env.REACT_APP_URL_API_DEVELOPMENT + data.imageUrl}
        className="md:w-44 md:h-28 w-screen h-56 opacity-90 md:rounded-md rounded-t-md hover:opacity-100"
        alt="thubmnail"
      />

      {/* main */}
      <div className="p-3 md:p-0">
        <div className="font-medium text-md md:text-md text-gray-500 dark:text-gray-400 flex space-x-2">
          <h1>{data.authour.fullName}</h1>
          <h1>•</h1>
          <h1>{data.authour.role}</h1>
        </div>
        {/* title */}
        <div className="font-medium text-md md:text-md md:flex md:space-x-2">
          <h1 className="dark:text-gray-500 text-gray-500">Menambahkan</h1>
          <h1>{trancute(data.title, 95)}</h1>
          <h1 className="dark:text-gray-500 text-gray-500">Dalam</h1>
          <h1>{data.category}</h1>
        </div>
        <div className="font-medium text-md md:text-md text-gray-400 dark:text-gray-400 flex space-x-2">
          <h1>{moment(data.createdAt).format("ll")}</h1>
        </div>
      </div>
    </div>
  );
}

export default DCard;
