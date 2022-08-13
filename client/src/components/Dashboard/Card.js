import { Link } from "react-router-dom";
import moment from "moment";

import Dropdown from "./Dropdown";
import Response from "./Response";

function Card({
  id,
  image,
  title,
  description,
  category,
  view,
  like,
  dislike,
  time,
  authour,
}) {
  const defaultImage =
    "http://www.srssafetyndo.com/assets/img/service/default.jpg";

  return (
    <div className="md:flex md:space-x-3 space-y-2 md:space-y-0">
      {/* image */}
      <div>
        <Link to={`/dashboard/articles/${id}/${title.replaceAll(" ", "-")}`}>
          <img
            crossOrigin="anonymous"
            src={
              image
                ? process.env.REACT_APP_URL_API_DEVELOPMENT + image
                : defaultImage
            }
            alt={
              image
                ? process.env.REACT_APP_URL_API_DEVELOPMENT + image
                : defaultImage
            }
            className="w-full h-64 md:w-64 md:h-36 bg-contain rounded-md opacity-95 hover:opacity-80"
          />
        </Link>
      </div>
      <div className="space-y-0 w-full">
        <div className="flex  justify-between items-center">
          {/* authour */}
          <div className="flex items-center space-x-3">
            <img
              src={
                image
                  ? process.env.REACT_APP_URL_API_DEVELOPMENT +
                    authour?.imageUrl
                  : defaultImage
              }
              alt={
                image
                  ? process.env.REACT_APP_URL_API_DEVELOPMENT +
                    authour?.imageUrl
                  : defaultImage
              }
              className="w-7 h-7 md:w-8 md:h-8 bg-contain rounded-full"
            />
            <h1 className="text-lg">{authour?.fullName}</h1>
          </div>

          {/* response */}
          <Response like={like} dislike={dislike} view={view} />
        </div>
        {/* title */}
        <div>
          <Link to={`/dashboard/articles/${id}/${title.replaceAll(" ", "-")}`}>
            <h1 className="text-xl md:text-2xl font-medium leading-6 cursor-pointer">
              {title}
            </h1>
          </Link>
        </div>

        <div>
          <Link to={`/dashboard/articles/${id}/${title.replaceAll(" ", "-")}`}>
            <h1
              dangerouslySetInnerHTML={{
                __html:
                  description?.length > 130
                    ? description?.substring(0, 130) + "..."
                    : description,
              }}
              className="hidden md:block text-md md:text-lg text-gray-500 dark:text-gray-400 font-medium cursor-pointer "
            />
          </Link>
        </div>

        {/* time */}
        <div className="flex items-center justify-between dark:text-gray-300 text-gray-500 w-full">
          <div className="flex items-center space-x-4">
            <h1 className="">{moment(time).format("LL")}</h1>
            <h1>•</h1>
            <h1 className="bg-gray-200 dark:bg-[#353535] rounded-full text-sm px-2 py-0.5">
              {category}
            </h1>
          </div>

          {/* dropdown */}
          <Dropdown title={title} id={id} />
        </div>
      </div>
    </div>
  );
}

export default Card;
