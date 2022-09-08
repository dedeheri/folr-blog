import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor({ error, ...rest }) {
  return (
    <div>
      <Editor
        {...rest}
        toolbarClassName="flex sticky top-[6rem] bg-red-500 z-30 md:!justify-center mx-auto"
        editorClassName="mt-2 md:mt-10 mb-12 px-4 bg-white dark:bg-[#3A3B3C] md:drop-shadow-md  max-w-5xl mx-auto rounded-sm scrollbar-hide"
      />
    </div>
  );
}

export default TextEditor;
