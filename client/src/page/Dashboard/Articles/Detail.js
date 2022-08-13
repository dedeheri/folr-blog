import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../apis/api";
import config from "../../../apis/config";

import moment from "moment";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import Response from "../../../components/Dashboard/Response";
import Dropdown from "../../../components/Dashboard/Dropdown";
import LoadingDetail from "../../../components/Dashboard/LoadingDetail";
import NoData from "../../../components/NoData";

// title
import { Helmet } from "react-helmet";

function Detail() {
  // params
  const params = useParams();

  // state
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getDetail(id) {
      try {
        const { data } = await api.get(`api/v1/articles/${id}`, config);
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
      }
    }

    getDetail(params.id);
  }, [params.id]);

  return loading ? (
    <LoadingDetail />
  ) : error ? (
    <NoData />
  ) : (
    <div className="space-y-10 pb-20 ">
      <Helmet>
        <title>Folr - {data?.data?.title}</title>
      </Helmet>

      {/* author */}
      <div className="md:flex items-center md:justify-between  max-w-5xl mx-auto">
        <div className="flex space-x-3 items-center ">
          <img
            src={
              process.env.REACT_APP_URL_API_DEVELOPMENT +
              data?.data?.authourId?.imageUrl
            }
            alt={
              process.env.REACT_APP_URL_API_DEVELOPMENT +
              data?.data?.authourId?.imageUrl
            }
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-md text-gray-600 dark:text-gray-300">
            {data?.data?.authourId?.fullName}
          </h1>
          <h1>•</h1>
          <h1 className="bg-gray-100 dark:bg-[#353535] rounded-full dark:text-gray-300 text-gray-600 text-md px-2 py-0.5">
            {data?.data?.category}
          </h1>
          <h1>•</h1>
          <h1 className="text-md text-gray-600 dark:text-gray-300 ">
            {moment(data?.data?.createdAt).format("ll")}
          </h1>
        </div>

        <div className="flex space-x-3 items-center pl-10">
          <Response
            like={data?.data?.like}
            dislike={data?.data?.dislike}
            view={data?.data?.view}
          />
          <Dropdown />
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
          <h1 key={i} className="text-gray-500 dark:text-gray-300 font-medium">
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
  );
}

export default Detail;
