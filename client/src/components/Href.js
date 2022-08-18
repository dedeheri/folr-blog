import { Link } from "react-router-dom";

function Href({ label, href }) {
  return (
    <div className="h-11 w-full border border-[#2374e1] hover:border-[#0f5abb] duration-300 rounded-md">
      <Link to={href}>
        <h1 className="text-lg font-medium justify-center flex pt-2">
          {label}
        </h1>
      </Link>
    </div>
  );
}

export default Href;
