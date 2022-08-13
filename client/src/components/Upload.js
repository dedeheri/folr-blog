import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";

function Upload({ error, message, view, deleted, ...rest }) {
  return (
    <div className="space-y-2 ">
      <label className="text-lg">Foto</label>
      <div className="h-60">
        <div
          className={`mt-1 h-full flex justify-center items-center px-6 pt-5 pb-6 border border-dashed rounded-md ${
            error ? "border-red-500" : "dark:border-[#353535] "
          }`}
        >
          {view ? (
            <div className="relative">
              <img src={view} alt={view} className="rounded-md h-48 w-full" />
              <div className="bg-black p-1 rounded-lg absolute bottom-2 right-2 flex space-x-2">
                <TrashIcon
                  onClick={deleted}
                  className="w-6 text-gray-400 hover:text-white duration-300 cursor-pointer"
                />

                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer text-[#00AB4C] dark:text-[#2BEF82]"
                >
                  <PencilIcon className="w-6 text-gray-400 hover:text-white duration-300 cursor-pointer" />
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    {...rest}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-center">
              <svg
                className="mx-auto h-16 w-1h-16 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div>
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer text-[#00AB4C] dark:text-[#2BEF82]"
                >
                  <span>Tambahkan file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    {...rest}
                  />
                </label>
              </div>
              <p className="text-md text-gray-500">PNG, JPG, GIF sampai 10MB</p>
            </div>
          )}
        </div>
      </div>
      {message && <h1 className="text-red-400 text-lg">{message}</h1>}
    </div>
  );
}

export default Upload;
