import { ExclamationIcon } from "@heroicons/react/outline";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function RichText({ error, ...rest }) {
  return (
    <div className="space-y-2 ">
      <div
        className={`rounded-md h-auto ${
          error ? "border border-red-500" : " border dark:border-[#353535]"
        }`}
      >
        <Editor
          editorClassName="px-4"
          toolbarClassName="bg-yellow-100"
          {...rest}
        />

        {error && (
          <div className="flex space-x-2 text-red-400">
            <ExclamationIcon className="w-4" />
            <h1 className="text-md">{error}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default RichText;
