import React from "react";

function TableCategory({ data }) {
  const coulums = ["Kategori", "Jumlah", "Tanggal"];

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
          {data.data.map((c, i) => (
            <tr
              key={i}
              className=" text-black  border-b duration-400 dark:border-[#3A3B3C]"
            >
              <td className="text-md font-medium whitespace-nowrap text-black dark:text-white py-1 pr-5">
                {c.category}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableCategory;
