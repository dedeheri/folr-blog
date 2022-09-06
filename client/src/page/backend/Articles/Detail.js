import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../../components/backend/Container";
import { getDetail } from "../../../utils/action/articles";
import { getAllCookies } from "../../../utils/cookie";

function Detail() {
  const params = useParams();
  const cookies = getAllCookies();

  const [articles, setArticles] = useState({
    data: {},
    error: false,
    success: false,
    loading: true,
    result: "",
  });

  useEffect(() => {
    getDetail(params.id, setArticles);
  }, [params.id]);

  const text = articles?.data?.description;
  const parser = new DOMParser();
  const textParser = parser.parseFromString(text, "text/html");

  const element = textParser.getElementsByTagName("span");
  const href = textParser.getElementsByTagName("a");

  for (let i = 0; i < element.length; i++) {
    if (cookies.theme === "dark") {
      element[i].style.color = "white";
    } else {
      element[i].style.color = "black";
    }
    element[i].style.backgroundColor = null;
  }

  return (
    <Container title={params.slug.replaceAll("-", " ")}>
      <div className="space-y-10 max-w-4xl mx-auto">
        {/* author */}
        <div className="flex items-center space-x-4">
          <img
            className="w-12 h-12 md:w-14 md:h-14 rounded-full"
            crossOrigin="anonymous"
            alt={
              process.env.REACT_APP_URL_API_DEVELOPMENT +
              articles?.data?.authour?.imageUrl
            }
            src={
              process.env.REACT_APP_URL_API_DEVELOPMENT +
              articles?.data?.authour?.imageUrl
            }
          />
          <div>
            <h1 className="font-medium text-md md:text-lg dark:text-gray-300">
              {articles?.data?.authour?.fullName}
            </h1>
            <div className="flex space-x-2">
              <h1 className="font-medium text-md dark:text-gray-400">
                {moment(articles?.data?.createdAt).format("ll")}
              </h1>

              <h1 className="font-medium text-md  dark:text-gray-400">•</h1>

              <h1 className="font-medium text-md bg-gray-100  dark:text-gray-400 dark:bg-[#3A3B3C] px-1.5 rounded-lg">
                {articles?.data?.category}
              </h1>
            </div>
          </div>
        </div>
        {/* title */}
        <h1 className="font-medium text-3xl md:text-4xl dark:text-gray-300">
          {articles?.data?.title}
        </h1>
        {/* image */}
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-full md:h-[37rem] bg-cover"
            crossOrigin="anonymous"
            alt={
              process.env.REACT_APP_URL_API_DEVELOPMENT +
              articles?.data?.imageUrl
            }
            src={
              process.env.REACT_APP_URL_API_DEVELOPMENT +
              articles?.data?.imageUrl
            }
          />
          <h1 className="font-medium text-md dark:text-gray-400">
            {articles?.data?.imageUrlCredit}
          </h1>
        </div>
        {/* content */}
        <h1
          dangerouslySetInnerHTML={{
            __html: new XMLSerializer().serializeToString(textParser),
          }}
        />
        {/* reference */}
        <div>
          {articles?.data?.reference?.map((_, i) => (
            <a
              href={_}
              target="_blank"
              key={i}
              className="font-medium text-md text-blue-500 italic"
            >
              {_}
            </a>
          ))}
        </div>
        {/* tags */}
        <div className="flex">
          {articles?.data?.hastag?.map((_, i) => (
            <h1
              key={i}
              className="font-medium text-md bg-gray-100 dark:bg-[#3A3B3C] px-2 py-1 rounded-md"
            >
              {_}
            </h1>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Detail;
