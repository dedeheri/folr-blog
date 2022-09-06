import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Modal from "./Modal";

function Image({ error, preview, deletePriview, ...rest }) {
  const [modalImage, setModalImage] = useState(false);
  return (
    <div className="space-y-2">
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-dashed rounded-md ${
          error ? " border border-red-500" : "border dark:border-[#353535]"
        }`}
      >
        {preview ? (
          <div className="relative">
            <img src={preview} className="w-full h-40 rounded-md" />

            <div className="absolute bottom-1 right-1 px-2 py-1 flex space-x-1 bg-black bg-opacity-50 p-1 rounded-md">
              <Modal
                show={modalImage}
                label={"Pratinjau"}
                close={setModalImage}
              >
                <img src={preview} alt="pratinjau" className="rounded-xl" />
              </Modal>

              <div
                onClick={() => setModalImage(!modalImage)}
                className="p-1 cursor-pointer"
              >
                <EyeIcon className="w-5 text-white hover:text-gray-400 duration-300" />
              </div>
              <div onClick={deletePriview} className="p-1 cursor-pointer">
                <TrashIcon className="w-5 text-white hover:text-gray-400 duration-300" />
              </div>
              <label htmlFor="file-upload" className="p-1 cursor-pointer">
                <PencilIcon className="w-5 text-white hover:text-gray-400 duration-300" />
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
            <div className="flex justify-center text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer  font-medium text-[#2374e1] hover:text-[#0f5abb]"
              >
                <h1 className="text-sm md:text-md ">Tambahkan Poto</h1>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  {...rest}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {error && <h1 className="font-medium text-red-500">{error}</h1>}
    </div>
  );
}

export default Image;
