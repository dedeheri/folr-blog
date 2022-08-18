import { ExclamationIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { deleteCategory, updateCategory } from "../../utils/action";
import Button from "../Button";
import Input from "../Input";
import Loading from "../Loading";
import Tooltips from "../Tooltips";
import Back from "../Back";
import Modal from "./Modal";

function CardCategory({ id, category }) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [data, setData] = useState({
    fetching: false,
    success: false,
    message: "",
    error: false,
    id: id,
    category: category,
  });

  function handleChange(e) {
    setData((prev) => ({ ...prev, category: e.target.value }));
  }

  function handleEditModal() {
    setModalEdit((prev) => !prev);
  }
  function handleDeleteModal() {
    setModalDelete((prev) => !prev);
  }
  function handleCloseDeleteModal() {
    setModalDelete((prev) => !prev);
  }

  async function handleSubmitUpdate() {
    try {
      setData((prev) => ({ ...prev, fetching: true }));
      const response = await updateCategory(data.id, data.category);
      setData((prev) => ({
        ...prev,
        success: true,
        message: response.data.message,
        fetching: false,
        error: false,
      }));

      if (response) {
        setInterval(() => {
          window.location.href = "/dashboard/category";
        }, 1000);
      }
    } catch (error) {
      setData((prev) => ({
        ...prev,
        success: false,
        message: error.response.data.message,
        fetching: false,
        error: true,
      }));
    }
  }

  async function handleSubmitDelete() {
    try {
      setData((prev) => ({ ...prev, fetching: true }));
      const response = await deleteCategory(data.id);
      setData((prev) => ({
        ...prev,
        success: true,
        message: response.data.message,
        fetching: false,
        error: false,
      }));

      if (response) {
        setInterval(() => {
          window.location.href = "/dashboard/category";
        }, 1000);
      }
    } catch (error) {
      setData((prev) => ({
        ...prev,
        success: false,
        message: error.response.data.message,
        fetching: false,
        error: true,
      }));
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-[#353535] cursor-pointer border border-transparent hover:border-[#2374e1] duration-300 rounded-xl p-5">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-lg">{category}</h1>
        <div className="flex">
          <Tooltips text={"Hapus"} top="top-12">
            <button
              onClick={handleDeleteModal}
              className="hover:bg-red-200 hover:dark:bg-red-800 p-2 rounded-full group duration-300"
            >
              <TrashIcon className="w-5 text-gray-500 group-hover:text-red-500 duration-300" />
            </button>
          </Tooltips>
          <Tooltips text={"Edit"} top="top-12">
            <div
              onClick={handleEditModal}
              className="hover:bg-green-200 hover:dark:bg-green-800 p-2 rounded-full group duration-300"
            >
              <PencilIcon className="w-5 text-gray-500 group-hover:text-green-500 duration-300" />
            </div>
          </Tooltips>
        </div>
      </div>

      <Modal
        show={modalEdit}
        label={"Edit Kategori"}
        close={setModalEdit}
        success={data.success}
      >
        {data.success && (
          <div className="dark:bg-green-700 bg-green-400 flex items-center px-5 h-10 w-full rounded-md">
            <h1 className="font-medium text-lg">{data.message}</h1>
          </div>
        )}

        {data.error && (
          <div className="dark:bg-red-700 bg-red-400 flex items-center px-5 h-10 w-full rounded-md">
            <h1 className="font-medium text-lg">{data.message}</h1>
          </div>
        )}

        <Input
          name="Category"
          placeholder={"Edit"}
          defaultValue={data.category}
          onChange={handleChange}
        />
        {data.fetching ? (
          <Loading />
        ) : (
          <Button label={"Edit"} onClick={handleSubmitUpdate} />
        )}
      </Modal>

      <Modal
        label={"Hapus Kategori"}
        close={setModalDelete}
        success={data.success}
        show={modalDelete}
      >
        {data.success && (
          <div className="dark:bg-green-700 bg-green-400 flex items-center px-5 h-10 w-full rounded-md">
            <h1 className="font-medium text-lg">{data.message}</h1>
          </div>
        )}

        {data.error && (
          <div className="dark:bg-red-700 bg-red-400 flex items-center px-5 h-10 w-full rounded-md">
            <h1 className="font-medium text-lg">{data.message}</h1>
          </div>
        )}

        <div className="flex justify-center flex-col items-center space-y-4">
          <ExclamationIcon className="w-36 text-red-500" />
          <div className="flex justify-center flex-col items-center ">
            <h1 className="text-xl font-medium text-gray-400 dark:text-[#797979]">
              Apakah Anda yakin ingin menghapus permanen?{" "}
              <span className="text-black dark:text-white font-bold">
                {data.category}
              </span>
            </h1>
            <h1 className="text-md font-medium text-gray-400 dark:text-[#797979]">
              Anda tidak dapat mengembalikan data yang sudah terhapus.
            </h1>
          </div>
          <div className="flex justify-between w-full space-x-3">
            <Back onClick={handleCloseDeleteModal} />
            {data.fetching ? (
              <Loading />
            ) : (
              <Button onClick={handleSubmitDelete} label={"Hapus"} />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CardCategory;
