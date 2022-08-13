import {
  ExclamationIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React from "react";

function ImageUpload({ error, preview, deletePriview, ...rest }) {
  return (
    <div>
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-dashed rounded-md ${
          error?.validation?.imageUrl
            ? " border border-red-500"
            : "border dark:border-[#353535]"
        }`}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} className="w-full h-40 rounded-md" />

            <div className="absolute bottom-0 right-0 px-2 py-1 flex space-x-1">
              <div
                onClick={deletePriview}
                className="bg-red-200 hover:bg-red-300 duration-300 p-1 rounded-full cursor-pointer"
              >
                <TrashIcon className="w-5 text-red-600" />
              </div>
              <label
                htmlFor="file-upload"
                className="bg-green-200 hover:bg-green-300 duration-300 p-1 rounded-full cursor-pointer"
              >
                <PencilIcon className="w-5 text-green-600" />
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
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer  font-medium text-[#2374e1] hover:text-[#0f5abb]"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  {...rest}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {error?.validation?.imageUrl?.msg && (
        <div className="flex space-x-2 text-red-400">
          <ExclamationIcon className="w-4" />
          <h1 className="text-md">{error?.validation?.imageUrl?.msg}</h1>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
