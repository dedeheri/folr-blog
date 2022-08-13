import React, { useState } from "react";
import Back from "../../../components/Back";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Loading from "../../../components/Loading";
import { addCategoryRequest } from "../../../utils/action";

function Add() {
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

      if (response) {
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
    <form onSubmit={addCategory} className="max-w-sm mx-auto space-y-4">
      {data?.message && (
        <div className="dark:bg-green-700 bg-green-400 flex items-center px-5 h-10 w-full rounded-md">
          <h1 className="font-medium text-lg">{data?.message}</h1>
        </div>
      )}

      <Input
        error={data?.error?.validation?.category?.msg || data?.error?.message}
        message={data?.error?.validation?.category?.msg || data?.error?.message}
        placeholder={"Kategori"}
        name="category"
        onChange={handleChange}
      />

      <div className="space-y-2">
        {data?.fetching ? <Loading /> : <Button label={"Kirim"} />}
        <Back />
      </div>
    </form>
  );
}

export default Add;
