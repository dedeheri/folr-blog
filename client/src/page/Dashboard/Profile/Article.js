import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import Dropdown from "../../../components/Dashboard/Dropdown";
import LoadingCard from "../../../components/Dashboard/LoadingCard";
import Response from "../../../components/Dashboard/Response";
import Sub from "../../../components/Dashboard/Sub";
import { getUsersArticles } from "../../../utils/action";

function Article() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    data: [],
    loading: true,
    error: "",
    pagination: {},
  });
  useEffect(() => {
    getUsersArticles(params.id, params.fullName, location.search, setData);
  }, [params.id, location.search]);

  function handlePage(page, limit) {
    navigate({
      search: `${createSearchParams({
        page: page,
        limit: limit,
      })}`,
    });
  }

  return data.loading ? (
    <LoadingCard />
  ) : (
    <Sub title={"a"}>
      <div className="space-y-4">
        <h1 className="font-medium text-lg dark:text-[#838383] text-gray-500">
          Menampilkan {data?.pagination?.from_page} -{" "}
          {data?.pagination?.to_page} dari {data?.pagination?.total_page}{" "}
          Artikel
        </h1>
        {data?.data?.map((data, index) => (
          <div
            key={index}
            className="md:flex md:space-x-3 space-y-2 md:space-y-0"
          >
            <img
              src={process.env.REACT_APP_URL_API_DEVELOPMENT + data.imageUrl}
              alt={process.env.REACT_APP_URL_API_DEVELOPMENT + data.imageUrl}
              className="w-full h-64 md:w-64 md:h-36 bg-contain rounded-md opacity-95 hover:opacity-80"
            />

            <div className="space-y-2">
              <h1 className="text-xl md:text-2xl font-medium leading-6 cursor-pointer">
                {data?.title}
              </h1>
              <h1
                dangerouslySetInnerHTML={{
                  __html:
                    data?.description?.length > 200
                      ? data?.description?.substring(0, 200) + "..."
                      : data?.description,
                }}
                className="text-md md:text-lg text-gray-500 dark:text-[#838383] font-medium cursor-pointer"
              />

              <div className="flex items-center justify-between dark:text-gray-300 text-gray-500 w-full">
                <div className="flex items-center space-x-4">
                  <h1 className="">{moment(data?.time).format("LL")}</h1>
                  <h1>•</h1>
                  <h1 className="bg-gray-200 dark:bg-[#353535] rounded-full text-sm px-2 py-0.5">
                    {data?.category}
                  </h1>
                </div>

                {/* dropdown */}
                <div className="flex">
                  <Response
                    like={data?.like}
                    dislike={data?.dislike}
                    view={data?.view}
                  />
                  <Dropdown />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* pagination */}
        <div className="space-x-2 flex justify-end">
          {data?.pagination?.previous && (
            <button
              onClick={() =>
                handlePage(
                  data?.pagination?.previous?.page,
                  data?.pagination?.previous?.limit
                )
              }
              className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3a3b3c] dark:hover:bg-[#404142] p-2  duration-300 rounded-full"
            >
              <ChevronLeftIcon className="w-6 text-gray-500 dark:text-gray-400" />
            </button>
          )}
          {data?.pagination?.next && (
            <button
              onClick={() =>
                handlePage(
                  data?.pagination?.next?.page,
                  data?.pagination?.next?.limit
                )
              }
              className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3a3b3c] dark:hover:bg-[#404142] p-2  duration-300 rounded-full"
            >
              <ChevronRightIcon className="w-6 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </Sub>
  );
}

export default Article;
