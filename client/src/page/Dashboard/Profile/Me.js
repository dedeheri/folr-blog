import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUsersRequest } from "../../../utils/action";

import NavProfile from "../../../components/Dashboard/NavProfile";
import Sub from "../../../components/Dashboard/Sub";
import ProfileHeader from "../../../components/Dashboard/ProfileHeader";
import Article from "./Article";
import Session from "./Session";

function Me() {
  const [user, setUser] = useState({
    data: {},
    loading: true,
    error: "",
  });

  useEffect(() => {
    async function getUser() {
      try {
        const response = await getUsersRequest();
        setUser({
          data: response.data.user,
          loading: false,
        });
      } catch (error) {
        setUser({
          error: error.response.data.message,
          loading: false,
        });
      }
    }

    getUser();
  }, []);

  const location = useLocation();

  if (user.loading) {
    return (
      <Sub title={"Loading"}>
        <div className="animate-pulse space-y-4 md:space-y-0 space-x-4 ">
          <div className="w-28 h-28  md:w-32 md:h-32  lg:w-40 lg:h-40 rounded-full border-4 dark:border-[#3a3b3c] border-gray-100 bg-gray-100 dark:bg-[#252525]" />
          <div className="space-y-4 ">
            <div className="bg-gray-100 dark:bg-[#252525] w-64 h-7 rounded-md" />
            <div className="bg-gray-100 dark:bg-[#252525] w-80 h-7 rounded-md" />
          </div>

          <div className="flex space-x-4">
            <div className="bg-gray-100 dark:bg-[#252525] w-64 h-7 rounded-md" />
            <div className="bg-gray-100 dark:bg-[#252525] w-80 h-7 rounded-md" />
          </div>
        </div>
      </Sub>
    );
  }

  switch (location.pathname) {
    case `/dashboard/me`:
      return (
        <Sub title={"a"}>
          <div className="w-full space-y-3">
            <ProfileHeader data={user} loading={user.loading} />
            <div className="pt-10 space-y-4">
              <NavProfile params={user} />
              <Article />
            </div>
          </div>
        </Sub>
      );

    case `/dashboard/me/trends`:
      return (
        <Sub title={"a"}>
          <div className="w-full space-y-3">
            <ProfileHeader data={user} loading={user.loading} />
            <div className="pt-10">
              <NavProfile params={user} />
            </div>
          </div>
        </Sub>
      );

    case `/dashboard/me/session`:
      return (
        <Sub title={"a"}>
          <div className="w-full space-y-3">
            <ProfileHeader data={user} loading={user.loading} />
            <div className="pt-10 space-y-4">
              <NavProfile params={user} />
              <Session />
            </div>
          </div>
        </Sub>
      );

    default:
      return console.log("here");
  }
}

export default Me;
