import {
  ChevronRightIcon,
  PresentationChartLineIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";
import React, { Fragment, useEffect, useState } from "react";
import Card from "../../components/Dashboard/Card";
import apis from "../../apis/api";
import config from "../../apis/config";
import LoadingCard from "../../components/Dashboard/LoadingCard";
import Featured from "../../components/Dashboard/Featured";
import LoadingFeatured from "../../components/Dashboard/LoadingFeatured";
import { Link } from "react-router-dom";

// title
import { Helmet } from "react-helmet";
import Sub from "../../components/Dashboard/Sub";

function Home() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // featured
  const [featuredData, setFeaturedData] = useState("");
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState("");

  useEffect(() => {
    async function getArticles() {
      try {
        const { data } = await apis.get("api/v1/articles", config);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    async function getFeatured() {
      try {
        const { data } = await apis.get("api/v1/articles/featured", config);
        setFeaturedData(data);
        setLoadingFeatured(false);
      } catch (error) {
        setErrorFeatured(error);
        setLoadingFeatured(false);
      }
    }

    getArticles();
    getFeatured();
  }, []);

  return (
    <Sub title={"Beranda"}>
      <div className="space-y-8 ">
        {/* featured */}
        {loadingFeatured ? (
          <LoadingFeatured />
        ) : (
          <Featured data={featuredData} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* aktivitas */}
          <div className="col-span-2 space-y-4">
            {loading ? (
              <LoadingCard />
            ) : (
              <Fragment>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <PresentationChartLineIcon className="w-6" />
                    <h1 className="text-xl"> Aktivitas</h1>
                  </div>
                  <Link to={"/dashboard/articles"}>
                    <ChevronRightIcon className="w-6" />
                  </Link>
                </div>

                {data?.data?.map((data) => (
                  <div key={data._id}>
                    <Card
                      id={data?._id}
                      image={data?.imageUrl}
                      title={data?.title}
                      description={data?.description}
                      topics={data?.topics}
                      view={data?.view}
                      like={data?.like}
                      dislike={data?.dislike}
                      authour={data?.authourId}
                      time={data?.createdAt}
                    />
                  </div>
                ))}
              </Fragment>
            )}
          </div>
          {/* trends */}
          <div>
            <div className="flex items-center w-full space-x-3">
              <TrendingUpIcon className="w-6" />
              <h1 className="text-xl"> Trend</h1>
            </div>
          </div>
        </div>
      </div>
    </Sub>
  );
}

export default Home;
