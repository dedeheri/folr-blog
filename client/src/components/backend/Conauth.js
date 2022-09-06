import React from "react";
import { getAllCookies } from "../../utils/cookie";
import Darkmode from "./Darkmode";
import Helmet from "react-helmet";

import { logoLight, logoDark } from "../../assets/image";
import Footer from "./Utils/Footer";

function Conauth({ title, children }) {
  const { theme } = getAllCookies();
  return (
    <Darkmode theme={theme}>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="">
        <div className="h-14 md:h-16 z-40 sticky top-0 px-4 flex">
          <div className="flex items-center space-x-2 md:space-x-3">
            {theme === "dark" ? (
              <img src={logoLight} alt="logo" className="w-32 md:w-36" />
            ) : (
              <img src={logoDark} alt="logo" className="w-32" />
            )}
          </div>
        </div>
        <div className="max-w-[20rem] mx-auto mt-20">{children}</div>
        <Footer />
      </div>
    </Darkmode>
  );
}

export default Conauth;
