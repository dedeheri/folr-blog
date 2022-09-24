import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import Darkmode from "../../../components/backend/Darkmode";
import Button from "../../../components/backend/Utils/Button";
import Fetching from "../../../components/backend/Utils/Fetching";
import GetArticles from "./GetArticles";

import { logoDark } from "../../../assets/image";
import Dropdown from "../../../components/backend/Utils/Dropdown";

import {
  ArrowLeftIcon,
  ClipboardListIcon,
  DocumentSearchIcon,
  HashtagIcon,
  SelectorIcon,
  CheckIcon,
  PhotographIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { getDetail } from "../../../utils/action/articles";
import TextEditor from "../../../components/backend/Utils/TextEditor";
import Input from "../../../components/backend/Utils/Input";
import Image from "../../../components/backend/Utils/Image";
import { Listbox, Transition } from "@headlessui/react";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";

function UpdateArticles() {
  const { id } = useParams();
  const [showSide, setShowSide] = useState(false);
  const navigate = useNavigate();

  // state of articles
  const [detailArticles, setDetailArticles] = useState({
    loading: false,
    success: true,
    message: "",
    data: "",
  });
  const [formArticles, setFormArticles] = useState({
    id: "",
    title: "",
    description: "",
    reference: [],
    category: "",
    hastag: "",
    imageUrl: null,
    imageUrlCredit: "",
    imagePriview: null,
    published: true,
    fetching: false,
    message: null,
    success: false,
    error: false,
  });

  // calling api detail
  useEffect(() => {
    getDetail(id, setDetailArticles);
  }, [id]);

  useEffect(() => {
    setFormArticles({
      id: detailArticles.data._id,
      title: detailArticles.data.title,
      description: detailArticles.data.description,
      reference: detailArticles.data.reference,
      category: detailArticles.data.category,
      hastag: detailArticles.data.hastag,
      imagePriview: detailArticles.data.imageUrl,
      imageUrl: detailArticles.data.imageUrl,
      imageUrlCredit: detailArticles.data.imageUrlCredit,
    });
  }, [id, detailArticles]);

  // handle state
  function handleThirdParty(key, value) {
    setFormArticles((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
  function handleChange(e) {
    handleThirdParty(e.target.name, e.target.value);
  }

  const { contentBlocks, entityMap } = htmlToDraft(
    formArticles?.description || ""
  );
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);

  function handleEditorState() {}

  console.log(formArticles.description);

  return (
    <Darkmode theme={false}>
      {/* title */}
      <Helmet>
        <title>Tambah Artikel - Proelefsi</title>
      </Helmet>

      {/* content */}
      <div className="w-full">
        {/* navbar */}
        <div className="flex items-center sticky z-40 top-0 px-4 justify-between  h-14 md:h-16 dark:border-[#3A3B3C] bg-white dark:bg-[#18191a]">
          <div className="space-x-2 md:space-x-3 flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-[#3A3B3C] hover:dark:bg-[#555555]  p-2 rounded-full duration-300"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <img src={logoDark} alt="logo" className="w-28 md:w-36" />
          </div>

          <div className="space-x-2 md:space-x-3 flex ">
            {false ? <Fetching /> : <Button text="Simpan" />}

            <button
              onClick={() => setShowSide(!showSide)}
              className="hover:bg-gray-100 hover:dark:bg-[#3A3B3C]  p-2 rounded-full duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-layout-sidebar-inset-reverse"
                viewBox="0 0 16 16"
              >
                <path d="M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h12z" />
                <path d="M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4z" />
              </svg>
            </button>

            <Dropdown />
          </div>
        </div>

        {/* sidepanel */}
        <div
          className={`h-screen w-[23rem] bg-white fixed right-0 z-50 top-0 border-l dark:border-[#3A3B3C] duration-300 ${
            showSide ? "translate-x-auto" : "translate-x-full"
          }`}
        >
          <div className="pt-3.5">
            <div className="flex items-center justify-between border-b pb-3 px-3">
              <button
                onClick={() => setShowSide(!showSide)}
                className="hover:bg-gray-100 hover:dark:bg-[#3A3B3C]  p-2 rounded-full duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-layout-sidebar-inset"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12zM2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z" />
                  <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                </svg>
              </button>

              <div className="flex items-center space-x-2">
                {false ? <Fetching /> : <Button text="Simpan" />}

                <Dropdown />
              </div>
            </div>

            {/* form */}
            <div className=" space-y-3">
              {/* title */}
              <div className="space-y-2 px-4 pt-4">
                <div className="flex text-gray-500 space-x-2">
                  <PencilIcon className="w-5 " />
                  <h1 className="font-medium text-xl">Judul</h1>
                </div>
                <Input
                  error={formArticles?.message?.validation?.title?.msg}
                  placeholder="Judul"
                  value={formArticles.title || ""}
                  onChange={handleChange}
                  name="title"
                />
              </div>
              {/* image */}
              <div className="border-b dark:border-[#3A3B3C]" />
              {/* cover */}
              <div className="space-y-2 px-4 ">
                <div className="flex items-center text-gray-500 space-x-2">
                  <PhotographIcon className="w-5" />
                  <h1 className="font-medium text-xl">Cover</h1>
                </div>
                <Image
                  error={formArticles?.message?.validation?.imageUrl?.msg}
                  //   onChange={handleImagePriview}
                  //   deletePriview={handleDeletePreview}
                  preview={
                    process.env.REACT_APP_URL_API_DEVELOPMENT +
                    formArticles.imagePriview
                  }
                />
                <Input
                  error={formArticles?.message?.validation?.imageUrlCredit?.msg}
                  placeholder="Sumber Gambar"
                  onChange={handleChange}
                  value={formArticles.imageUrlCredit || " "}
                  name="imageUrlCredit"
                />
              </div>

              <div className="border-b dark:border-[#3A3B3C]" />
              {/* category */}
              <div className="space-y-2 px-4">
                <div className="flex text-gray-500 space-x-2">
                  <ClipboardListIcon className="w-5 " />
                  <h1 className="font-medium text-xl">Kategori</h1>
                </div>

                {/* start listbox */}

                <Listbox
                  value={formArticles.category}
                  //   onChange={(e) => handleChangeListbox(e)}
                >
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg border dark:border-[#363535] py-2 pl-3  text-left outline-none">
                      {false ? (
                        <div className="h-6 w-1/2 animate-pulse bg-gray-500 rounded-md" />
                      ) : (
                        <span className="block truncate">
                          {formArticles?.category}
                        </span>
                      )}
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute  mt-1 max-h-52  w-full  overflow-auto rounded-md border dark:border-[#363535] bg-white  dark:bg-[#18191a] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full text-md z-40">
                        {/* {Object.values(category.category)?.map(
                          (person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={`relative cursor-pointer select-none py-2 pl-10 hover:bg-gray-100 hover:dark:bg-[#252525] pr-4 ${
                                person.category === articles.category
                                  ? "bg-gray-100 dark:bg-[#252525]"
                                  : "text-white dark:text-white"
                              }`}
                              value={person}
                            >
                              <>
                                <span
                                  className={`block truncate text-black dark:text-white`}
                                >
                                  {person.category}
                                </span>
                                {person.category === articles.category ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#176cda]">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            </Listbox.Option>
                          )
                        )} */}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>

                {/* end listbox */}
              </div>

              <div className="border-b dark:border-[#3A3B3C]" />
              {/* reference */}
              <div className="space-y-2 px-4">
                <div className="flex text-gray-500 space-x-2">
                  <DocumentSearchIcon className="w-5 " />
                  <h1 className="font-medium text-xl">Referensi</h1>
                </div>
                {formArticles?.reference?.map((_, i) => (
                  <Input
                    key={i}
                    error={formArticles?.message?.validation?.hastag?.msg}
                    placeholder="Referensi"
                    value={_ || ""}
                    onChange={handleChange}
                    name="hastag"
                  />
                ))}

                <div className="flex justify-between">
                  <h1 className="font-medium text-sm text-gray-500 hover:text-blue-700 cursor-pointer duration-300">
                    Tambah Baris
                  </h1>
                  {formArticles?.reference?.length > 1 && (
                    <h1 className="font-medium text-sm text-gray-500 hover:text-red-700 cursor-pointer duration-300">
                      Hapus Baris
                    </h1>
                  )}
                </div>
              </div>

              <div className="border-b dark:border-[#3A3B3C]" />
              {/* hastag */}
              <div className="space-y-2 px-4">
                <div className="flex text-gray-500 space-x-2">
                  <HashtagIcon className="w-5 " />
                  <h1 className="font-medium text-xl">Hastag</h1>
                </div>
                <Input
                  error={formArticles?.message?.validation?.hastag?.msg}
                  placeholder="Hastag"
                  value={formArticles.hastag || ""}
                  onChange={handleChange}
                  name="hastag"
                />
              </div>
            </div>
            {/* end form */}
          </div>
        </div>

        {/* description */}
        <div className="max-w-6xl mx-auto pt-9 md:pt-7  space-y-7">
          {/* {articles.success && <ToastSuccess message={articles.message} />} */}

          <TextEditor
            editorState={editorState}
            onEditorStateChange={handleEditorState}
          />
        </div>
      </div>
    </Darkmode>
  );
}

export default UpdateArticles;
