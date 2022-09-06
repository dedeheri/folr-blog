import {
  ChevronRightIcon,
  DocumentTextIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";

import Container from "../../components/backend/Container";
import CardTrendingLoading from "../../components/backend/Loading/CardTrendingLoading";
import DCardLoading from "../../components/backend/Loading/DCardLoading";
import DCard from "../../components/backend/Utils/DCard";
import DCardTrending from "../../components/backend/Utils/DCardTrending";

// api
import {
  getArticles,
  getArticlesHomeRequest,
  getArticlesTrends,
} from "../../utils/action/articles";

function Home() {
  const [trending, setTrending] = useState({
    data: {},
    success: false,
    error: false,
    loading: true,
    message: "",
  });
  const [data, setData] = useState({
    data: {},
    success: false,
    error: false,
    loading: true,
    message: "",
  });

  // get api

  useEffect(() => {
    getArticles(setData);
    getArticlesTrends(setTrending);
  }, []);

  return (
    <Container title={"Artikel"}>
      <div className="space-y-9 ">
        {/* trending */}
        <div className="space-y-5">
          <div className="flex justify-between  space-x-3 items-center dark:text-gray-400 text-gray-500">
            <div className="flex  items-center space-x-3 ">
              <TrendingUpIcon className="w-6" />
              <h1 className="font-medium text-lg">Trending</h1>
            </div>
            <button className="flex items-center space-x-2 text-[#2374E1] hover:text-[#0d5ac0] duration-300">
              <h1 className="font-medium text-lg">Lihat</h1>
              <ChevronRightIcon className="w-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {trending.loading ? (
              <CardTrendingLoading />
            ) : (
              Object.values(trending.data).map((d, i) => (
                <DCardTrending key={i} index={i} data={d} />
              ))
            )}
          </div>
        </div>

        <div className="border-b dark:border-[#3A3B3C]" />
        {/* activity */}
        <div className="space-y-5">
          <div className="flex justify-between space-x-3 items-center dark:text-gray-400 text-gray-500">
            <div className="flex  items-center space-x-3 ">
              <DocumentTextIcon className="w-6" />
              <h1 className="font-medium text-lg">Aktivitas</h1>
            </div>

            <button className="flex items-center space-x-2 text-[#2374E1] hover:text-[#0d5ac0] duration-300">
              <h1 className="font-medium text-lg">Lihat</h1>
              <ChevronRightIcon className="w-6" />
            </button>
          </div>
          {data.loading ? (
            <DCardLoading />
          ) : (
            Object.values(data.data).map((d, i) => <DCard key={i} data={d} />)
          )}
        </div>
      </div>
    </Container>
  );
}

export default Home;
