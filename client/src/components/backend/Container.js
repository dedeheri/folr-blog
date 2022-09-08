import React, { useEffect, useState } from "react";
import { getAllCookies } from "../../utils/cookie";
import Darkmode from "./Darkmode";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import Helmet from "react-helmet";
import { userRequest } from "../../utils/action/auth";
import Verification from "../../page/backend/Verification";

function Container({ title, children, sideShow }) {
  const cookie = getAllCookies();
  const [sidebar, setSidebar] = useState(false);

  const [user, setUser] = useState({
    fullName: "",
    imageUrl: "",
    loading: true,
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    userRequest(setUser);
  }, []);

  function handleSidebar() {
    setSidebar((prev) => !prev);
  }

  if (user?.message?.message) {
    return <Verification message={user?.message?.message} />;
  }

  return (
    <Darkmode theme={cookie.theme} className="">
      <Helmet>
        <title>{title} - Proelefsi</title>
      </Helmet>

      <Navbar user={user} handleSidebar={handleSidebar} theme={cookie.theme} />
      <div className="flex">
        <Sidebar sidebar={sidebar} />
        <div
          className={` py-4 w-full duration-300  pl-[5rem] pr-8 md:pr-10 ${
            sidebar ? "md:pl-[6rem]" : "md:pl-[16rem] "
          }`}
        >
          {children}
        </div>
      </div>
    </Darkmode>
  );
}

export default Container;
