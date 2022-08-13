import React, { useState } from "react";

import { XIcon } from "@heroicons/react/solid";

import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import Button from "../../../components/Button";
import { addCategoryRequest } from "../../../utils/action";
function Sidebar({ setShow, show }) {
  const [data, setData] = useState({
    category: "",
    fetching: false,
    error: {},
    message: "",
  });

  function handleChange(e) {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function addCategory(e) {
    e.preventDefault();
    try {
      setData((prev) => ({ ...prev, fetching: true }));
      const response = await addCategoryRequest({ category: data.category });
      setData((prev) => ({
        ...prev,
        message: response.data.message,
        fetching: false,
      }));

      if (response.data.message) {
        setInterval(() => {
          window.location.href = "/dashboard/category";
        }, 2000);
      }
    } catch (error) {
      setData((prev) => ({
        ...prev,
        error: error.response.data,
        fetching: false,
      }));
    }
  }

  return (
    <div
      className={`top-0 right-0 fixed h-full z-50  bg-black bg-opacity-60 w-screen ${
        show ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <form
        onSubmit={addCategory}
        className={`w-full top-0 h-full right-0 fixed md:w-[24rem]  lg:w-[27rem] dark:bg-[#242526] bg-white border-l dark:border-[#353535] duration-500  ${
          show ? "translate-x-0 " : "translate-x-full "
        }`}
      >
        <div className="flex justify-between items-center border-b dark:border-[#353535] p-3">
          <h1 className="text-xl font-medium">Tambah Kategori</h1>
          <div
            onClick={() => setShow((prev) => !prev)}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3a3b3c] dark:hover:bg-[#404142] p-2 duration-300 rounded-full cursor-pointer"
          >
            <XIcon className="w-5 text-gray-600 dark:text-gray-300 rounded-lg" />
          </div>
        </div>

        <div className="mt-10 space-y-7 px-5">
          {data?.message && (
            <div className="dark:bg-green-700 bg-green-400 flex items-center px-5 h-10 w-full rounded-md">
              <h1 className="font-medium text-lg">{data?.message}</h1>
            </div>
          )}

          <Input
            error={
              data?.error?.validation?.category?.msg || data?.error?.message
            }
            message={
              data?.error?.validation?.category?.msg || data?.error?.message
            }
            placeholder={"Kategori"}
            name="category"
            onChange={handleChange}
          />

          {data.fetching ? <Loading /> : <Button label={"Kirim"} />}
        </div>
      </form>
    </div>
  );
}

export default Sidebar;
