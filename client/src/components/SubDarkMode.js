import React, { Children } from "react";

function SubDarkMode({ children }) {
  return (
    <div className="bg-white dark:bg-[#242526] rounded-xl p-2">{children}</div>
  );
}

export default SubDarkMode;
