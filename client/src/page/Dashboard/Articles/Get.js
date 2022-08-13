import React, { useEffect, useState } from "react";
import Add from "../../../components/Dashboard/Add";
import Filter from "../../../components/Dashboard/Filter";

import InfiniteScroll from "react-infinite-scroll-component";

// api

import { getArticlesRequest } from "../../../utils/action";

import apis from "../../../apis/api";
import config from "../../../apis/config";
import LoadingCard from "../../../components/Dashboard/LoadingCard";
import Card from "../../../components/Dashboard/Card";
import { useLocation } from "react-router-dom";
import NoData from "../../../components/NoData";
import Error from "../../../components/Error";

// title
import Sub from "../../../components/Dashboard/Sub";

function Get() {
  // location
  const location = useLocation();
  // state
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(5);

  const [data, setData] = useState({
    data: [],
    loading: true,
    hashMore: true,
    lastData: 0,
    error: "",
  });

  useEffect(() => {
    async function getArticles() {
      try {
        const r = location.search.replaceAll("?", "");
        const response = await getArticlesRequest(limit, r);
        setData({
          data: response.data.data,
          hashMore: response.data.hashMore,
          lastData: response.data.lastData,
          loading: false,
        });
      } catch (error) {
        setData({
          error: error.response.data,
          loading: false,
          hashMore: false,
        });
      }
    }
    getArticles();
  }, [location.search, limit]);

  if (data.loading) {
    return (
      <Sub title={"Loading"}>
        <LoadingCard />
      </Sub>
    );
  } else if (data.data.length === 0) {
    return (
      <Sub title={"Artikel"}>
        <div className="flex space-x-4 justify-end items-center">
          <Filter />
          <Add label="Tambah Artikel" />
        </div>
        <NoData />
      </Sub>
    );
  } else if (error) {
    return (
      <Sub title={"Artikel"}>
        <Error />
      </Sub>
    );
  } else {
    return (
      <Sub title={"Artikel"}>
        <div className="space-y-4">
          <div className="flex space-x-4 justify-end items-center">
            <Filter />
            <Add label="Tambah Artikel" />
          </div>
          {data?.data?.map((data) => (
            <div key={data._id}>
              <Card
                id={data?._id}
                image={data?.imageUrl}
                title={data?.title}
                description={data?.description}
                category={data?.category}
                view={data?.view}
                like={data?.like}
                dislike={data?.dislike}
                authour={data?.authour}
                time={data?.createdAt}
              />
            </div>
          ))}
        </div>
      </Sub>
    );
  }
}

export default Get;
