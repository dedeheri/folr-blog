import { PlusIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Add({ label }) {
  return (
    <Link to="add">
      <button className="md:bg-[#2374e1] md:hover:bg-[#0f5abb] duration-300 md:px-4  items-center h-10 rounded-md flex space-x-3">
        <PlusIcon className="w-7 md:w-6 md:text-white " />
        <h1 className="font-medium text-lg hidden md:block md:text-white   text-black">
          {label}
        </h1>
      </button>
    </Link>
  );
}

export default Add;
