import React from "react";

function Tooltips({ text, top, children }) {
  return (
    <div className="relative flex flex-col items-center group ">
      {children}
      <div
        className={`absolute  scale-0 z-10 group-hover:scale-100 duration-300 flex flex-col items-center mb-6 ${top}`}
      >
        <div className="w-3 h-3 -rotate-45 bg-black dark:bg-[#252525]" />
        <span className="relative -mt-2 z-10 rounded-md py-2 px-4 text-lg font-medium leading-none text-white whitespace-no-wrap bg-black dark:bg-[#252525] shadow-lg cursor-default">
          {text}
        </span>
      </div>
    </div>
  );
}

export default Tooltips;
