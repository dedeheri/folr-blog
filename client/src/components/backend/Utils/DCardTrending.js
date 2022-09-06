import moment from "moment";
import React from "react";
import trancute from "../../../utils/trancute";

function DCardTrending({ index, data }) {
  return (
    <div className="flex space-x-4">
      <h1 className="text-3xl md:text-4xl dark:text-gray-400 text-gray-300 font-bold">
        #{index + 1}
      </h1>
      <div>
        <div className="font-medium text-md md:text-lg text-gray-500  dark:text-gray-400 flex space-x-2">
          <h1>{data.authour.fullName}</h1>
          <h1>•</h1>
          <h1>{data.authour.role}</h1>
        </div>
        {/* title */}
        <div className="font-medium text-md md:text-lg">
          <h1>{trancute(data.title, 27)}</h1>
          <h1>{data.category}</h1>
        </div>
        <div className="font-medium text-md md:text-lg text-gray-500  dark:text-gray-400 flex space-x-2">
          <h1>{moment(data.createdAt).format("ll")}</h1>
        </div>
      </div>
    </div>
  );
}

export default DCardTrending;
