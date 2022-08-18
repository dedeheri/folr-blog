import React from "react";

import { Helmet } from "react-helmet";

function Sub({ title, children }) {
  return (
    <div className="py-4 md:py-8 px-10">
      <Helmet>
        <title>{title} - Folr</title>
      </Helmet>
      {children}
    </div>
  );
}

export default Sub;
