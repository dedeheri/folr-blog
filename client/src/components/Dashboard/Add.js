import { PlusIcon } from "@heroicons/react/solid";

import { Link } from "react-router-dom";

// components
import Tooltips from "../Tooltips";

function Add({ label }) {
  return (
    <Tooltips text={label} top="top-10 md:top-12">
      <Link to="add">
        <button className="md:bg-[#2374e1] md:hover:bg-[#0f5abb] duration-300 md:px-4 items-center h-10 text-white rounded-md flex space-x-3">
          <PlusIcon className="w-7 md:w-6" />
          <h1 className="font-medium text-lg hidden md:block">{label}</h1>
        </button>
      </Link>
    </Tooltips>
  );
}

export default Add;
