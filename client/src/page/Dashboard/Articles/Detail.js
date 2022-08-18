import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import moment from "moment";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import Response from "../../../components/Dashboard/Response";
import Dropdown from "../../../components/Dashboard/Dropdown";
import LoadingDetail from "../../../components/Dashboard/LoadingDetail";
import Sub from "../../../components/Dashboard/Sub";
import NoData from "../../../components/NoData";

// title
import { getDetailArticlesRequest } from "../../../utils/action";

function Detail() {
  // params
  const params = useParams();

  // state
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDetail() {
      try {
        const { data } = await getDetailArticlesRequest(params.id);
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
      }
    }

    getDetail();
  }, [params.id]);

  return loading ? (
    <Sub title="Loading">
      <NoData />
      <LoadingDetail />
    </Sub>
  ) : error ? (
    <Sub title="Artikel tidak dapat ditemukan">
      <NoData />
    </Sub>
  ) : (
    <Sub title={data?.data?.title}>
      <div className="space-y-8 pb-20 ">
        {/* author */}
        <div className="md:flex items-center md:justify-between max-w-5xl mx-auto">
          <div className="flex space-x-3 items-center ">
            <img
              src={
                process.env.REACT_APP_URL_API_DEVELOPMENT +
                data?.data?.authour?.imageUrl
              }
              alt={
                process.env.REACT_APP_URL_API_DEVELOPMENT +
                data?.data?.authour?.imageUrl
              }
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-md text-gray-800 font-medium dark:text-gray-300">
              {data?.data?.authour?.fullName}
            </h1>
            <h1>•</h1>
            <h1 className="bg-gray-100 dark:bg-[#353535] rounded-md dark:text-gray-300 text-gray-800 font-medium text-md px-2 py-0.5">
              {data?.data?.category}
            </h1>
            <h1>•</h1>
            <h1 className="text-md text-gray-800 font-medium dark:text-gray-300 ">
              {moment(data?.data?.createdAt).format("ll")}
            </h1>
          </div>
        </div>

        <h1 className="font-bold text-3xl  max-w-5xl mx-auto">
          {data?.data?.title}
        </h1>
        <div className="flex justify-center flex-col space-y-4">
          <Zoom>
            <img
              src={
                process.env.REACT_APP_URL_API_DEVELOPMENT + data?.data?.imageUrl
              }
              alt={
                process.env.REACT_APP_URL_API_DEVELOPMENT + data?.data?.imageUrl
              }
              className="mx-auto"
            />
          </Zoom>

          <h1 className="text-md text-center">{data?.data?.imageUrlCredit}</h1>
        </div>

        <h1
          className="text-lg leading-6  max-w-5xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data?.data?.description }}
        />

        <div className="max-w-5xl mx-auto flex space-x-2">
          {data?.data?.hastag?.map((_, i) => (
            <h1
              key={i}
              className="text-gray-500 dark:text-gray-300 font-medium"
            >
              {_}
            </h1>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl">Referensi</h1>
          <div className="flex flex-col">
            {data?.data?.reference?.map((_, i) => (
              <a key={i} href={_} target="_blank" className="text-blue-500">
                {_}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Sub>
  );
}

export default Detail;
