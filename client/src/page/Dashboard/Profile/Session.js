import moment from "moment";
import React, { useEffect, useState } from "react";

// apis
import { getUsersSessionRequest } from "../../../utils/action";

function Session() {
  const [data, setData] = useState({
    data: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    async function getSessionUsers() {
      try {
        const response = await getUsersSessionRequest();
        setData({
          data: response.data.data,
          loading: false,
        });
      } catch (error) {
        setData({
          error: error.response.data,
          loading: false,
        });
      }
    }

    getSessionUsers();
  }, []);

  return data.loading ? (
    <div className="animate-pulse space-y-4">
      {[...Array(2)].map((_, i) => (
        <div
          className="w-full h-36 bg-gray-100 dark:bg-[#252525] rounded-md"
          key={i}
        />
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      {data?.data?.map((data, index) => (
        <div
          key={index}
          className="bg-gray-100 dark:bg-[#252525] p-5 rounded-lg flex justify-between"
        >
          <div className="">
            <h1 className="text-lg font-medium">
              IP{" "}
              <span className="text-gray-500 dark:text-[#9F9F9F] text-lg font-medium">
                {data?.location.ip}
              </span>
            </h1>

            <h1 className="text-lg font-medium">
              Lokasi (Sekitar){" "}
              <span className="text-gray-500 dark:text-[#9F9F9F] text-lg font-medium">
                {data?.location.city} , {data?.location.countryName}
              </span>
            </h1>

            <h1 className="text-lg font-medium">
              Perangkat{" "}
              <span className="text-gray-500 dark:text-[#9F9F9F] text-lg font-medium">
                {data?.device.client}
              </span>
            </h1>
            <h1 className="text-lg font-medium">
              Sistem Oprasi{" "}
              <span className="text-gray-500 dark:text-[#9F9F9F] text-lg font-medium">
                {data?.device.os}
              </span>
            </h1>
            <h1 className="text-lg font-medium">
              Diakses Terakhir{" "}
              <span className="text-gray-500 dark:text-[#9F9F9F] text-lg font-medium">
                {moment(data?.createdAt).format("ll")}
              </span>
            </h1>
          </div>

          {index === 0 && (
            <h1 className="text-[#2374E1] text-lg font-medium hover:underline cursor-pointer">
              Sekarang
            </h1>
          )}

          {index > 0 && (
            <h1 className="text-red-500 text-lg font-medium hover:underline cursor-pointer">
              Hapus
            </h1>
          )}
        </div>
      ))}
    </div>
  );
}

export default Session;
