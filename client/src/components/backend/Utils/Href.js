import { Link } from "react-router-dom";

function Href({ text, href, color, border }) {
  return (
    <div>
      <Link to={href}>
        <div
          className={`cursor-pointer hover:bg-opacity-80 duration-300 text-white h-10 w-full rounded-md ${color} ${border} flex items-center justify-center`}
        >
          <h1 className="font-medium text-lg">{text}</h1>
        </div>
      </Link>
    </div>
  );
}

export default Href;
