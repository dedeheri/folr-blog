import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/outline";
import millify from "millify";
import Tooltips from "../Tooltips";

function Response({ view, like, dislike }) {
  return (
    <div className="flex space-x-5 dark:text-gray-300 text-gray-500">
      <Tooltips text={"Lihat"} top="top-7">
        <div className="flex space-x-1 items-center">
          <EyeIcon className="w-5" />
          <h2>{millify(view)}</h2>
        </div>
      </Tooltips>
      <Tooltips text={"Suka"} top="top-7">
        <div className="flex space-x-1 items-center">
          <ThumbUpIcon className="w-5" />
          <h2>{millify(like)}</h2>
        </div>
      </Tooltips>
      <Tooltips text={"Tidak Suka"} top="top-7">
        <div className="flex space-x-1 items-center">
          <ThumbDownIcon className="w-5" />
          <h2>{millify(dislike)}</h2>
        </div>
      </Tooltips>
    </div>
  );
}

export default Response;
