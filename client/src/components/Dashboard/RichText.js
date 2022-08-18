import { ExclamationIcon } from "@heroicons/react/outline";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function RichText({ error, ...rest }) {
  return (
    <div className="space-y-2 ">
      <div>
        <Editor
          editorClassName="px-4 border-t overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin"
          toolbarClassName="bg-yellow-100 "
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
