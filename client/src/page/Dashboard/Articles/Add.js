import {
  PlusIcon,
  CheckIcon,
  SelectorIcon,
  HashtagIcon,
  PhotographIcon,
  DocumentSearchIcon,
  TrashIcon,
  ViewGridAddIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ExclamationIcon,
} from "@heroicons/react/outline";
import { Transition, Listbox } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

// text

import { addArticlesRequest, categoryRequest } from "../../../utils/action";

// components
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import RichText from "../../../components/Dashboard/RichText";
import ImageUpload from "../../../components/Dashboard/ImageUpload";
import Loading from "../../../components/Loading";
import Back from "../../../components/Back";
import Sub from "../../../components/Dashboard/Sub";

// draft
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";

function Add() {
  const [sidebar, setSidebar] = useState(true);

  const [category, setCategory] = useState({
    category: [],
    error: "",
    loading: true,
    selected: "",
  });

  const [articles, setArticles] = useState({
    title: "",
    description: EditorState.createEmpty(),
    reference: [],
    category: "",
    hastag: "",
    imageUrl: null,
    imageUrlCredit: "",
    imagePriview: null,

    fetching: false,
    message: null,
    success: false,
    error: false,
  });

  // priview
  function handleInputparty(key, value) {
    setArticles((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // calling api
  useEffect(() => {
    async function getCategory() {
      try {
        const response = await categoryRequest();
        setCategory({
          category: response.data.data,
          loading: false,
        });
        setArticles((prev) => ({
          ...prev,
          category: response.data.data[0].category,
        }));
      } catch (error) {
        setCategory({
          error: error.response.data,
          loading: false,
        });
      }
    }

    getCategory();
  }, []);

  function handleImagePriview(e) {
    const img = e.target.files[0];
    if (img) {
      handleInputparty("imagePriview", URL.createObjectURL(img));
      handleInputparty("imageUrl", img);
    }
  }

  function deleteImagePriview() {
    handleInputparty("imagePriview", null);
    handleInputparty("imageUrl", null);
  }

  function handleEditorState(description) {
    handleInputparty("description", description);
  }

  const [increaseReference, setIncreaseReference] = useState([
    { reference: "" },
  ]);

  function handleChangeInput(e) {
    handleInputparty([e.target.name], e.target.value);
  }

  const handleDynamicReference = (index, event) => {
    let data = [...increaseReference];
    data[index][event.target.name] = event.target.value;
    setArticles((prev) => ({ ...prev, reference: data }));
  };
  const addFieldsReference = () => {
    let newfield = { reference: "" };
    setIncreaseReference([...increaseReference, newfield]);
  };
  const removeFieldsReference = (index) => {
    let data = [...increaseReference];
    data.splice(index, 1);
    setIncreaseReference(data);
  };

  function handleChangeListbox(e) {
    handleInputparty("category", e.category);
  }

  async function handleAddArticles(e) {
    e.preventDefault();

    // proccess fetching true
    handleInputparty("fetching", true);

    const formData = new FormData();
    formData.append("title", articles.title);
    formData.append(
      "description",
      draftToHtml(convertToRaw(articles.description.getCurrentContent()))
    );
    formData.append("imageUrl", articles.imageUrl);
    formData.append("imageUrlCredit", articles.imageUrlCredit);
    for (let i = 0; i < articles.reference.length; i++) {
      formData.append("reference", articles.reference[i].reference);
    }
    formData.append("category", articles.category);
    formData.append(
      "hastag",
      articles.hastag ? articles.hastag.split(",") : ""
    );

    try {
      const data = await addArticlesRequest(formData);
      handleInputparty("fetching", false);
      handleInputparty("success", true);
      handleInputparty("message", data?.data?.message);
      if (data) {
        setInterval(() => {
          window.location.href = "/dashboard/articles";
        }, 2000);
      }
    } catch (error) {
      handleInputparty("fetching", false);
      handleInputparty("success", false);
      handleInputparty("message", error.response.data);
    }
  }

  return (
    <Sub title={"Tambah Artikel"}>
      {/* notification */}
      {articles.success && (
        <div className="dark:bg-green-700 bg-green-400 flex items-center px-5 h-10 w-full rounded-md">
          <h1 className="font-medium text-lg">{articles.message}</h1>
        </div>
      )}

      {/* main */}
      <form className="space-y-4" onSubmit={handleAddArticles}>
        {sidebar ? (
          <div
            onClick={() => setSidebar(!sidebar)}
            className="flex justify-end items-center text-gray-500 hover:text-[#0f5abb] cursor-pointer duration-300"
          >
            <h1 className="font-medium">Sembunyikan </h1>
            <ChevronRightIcon className="w-5" />
          </div>
        ) : (
          <div
            onClick={() => setSidebar(!sidebar)}
            className="flex justify-end items-center text-gray-500 hover:text-[#0f5abb] cursor-pointer duration-300"
          >
            <ChevronLeftIcon className="w-5" />
            <h1 className="font-medium">Tampilkan </h1>
          </div>
        )}
        <div className="md:flex ">
          <div className="shadow-lg rounded-md border dark:border-[#353535] w-full h-full">
            {/* title */}
            <div className="px-5 py-3 space-y-1">
              <input
                className={`outline-none border-b bg-transparent w-full text-xl font-medium ${
                  articles?.message?.validation?.title?.msg
                    ? "border-red-500"
                    : "border-transparent"
                }`}
                placeholder="Judul"
                name="title"
                onChange={handleChangeInput}
              />

              {articles?.message?.validation?.title?.msg && (
                <div className="flex space-x-2 text-red-400">
                  <ExclamationIcon className="w-4" />
                  <h1 className="text-md">
                    {articles?.message?.validation?.title?.msg}
                  </h1>
                </div>
              )}
            </div>
            {/* rich text */}
            <RichText
              onEditorStateChange={handleEditorState}
              editorState={articles.description}
              error={articles?.message?.validation?.description?.msg}
            />
          </div>

          {/* sidebar */}
          <div className={sidebar ? "w-full md:w-[30rem] md:pl-7" : "w-0"}>
            <div className={`space-y-5 px-2 ${sidebar ? "block" : "hidden"}`}>
              {/* thubmnil */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <PhotographIcon className="w-5" />
                  <h1>Koper</h1>
                </div>

                <div className="space-y-2">
                  <ImageUpload
                    preview={articles.imagePriview}
                    error={articles?.message?.validation?.imageUrl?.msg}
                    onChange={handleImagePriview}
                    deletePriview={deleteImagePriview}
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    name="imageUrlCredit"
                    onChange={handleChangeInput}
                    error={articles?.message?.validation?.imageUrlCredit?.msg}
                    placeholder={"Sumber"}
                  />
                </div>
              </div>

              <div className="border-b dark:border-[#353535]" />

              {/* reference */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DocumentSearchIcon className="w-5" />
                  <h1>Referensi</h1>
                </div>
                <div className="space-y-2">
                  {increaseReference.map((_, index) => (
                    <Input
                      link={true}
                      error={articles?.message?.validation?.reference?.msg}
                      placeholder={"referensi"}
                      key={index}
                      name="reference"
                      onChange={(event) => handleDynamicReference(index, event)}
                    />
                  ))}
                  <div className="flex justify-between">
                    <div
                      onClick={addFieldsReference}
                      className="flex items-center space-x-3 cursor-pointer dark:text-gray-400 hover:dark:text-white duration-300"
                    >
                      <PlusIcon className="w-5" />
                      <h1>Tambah Referensi</h1>
                    </div>

                    {increaseReference.length > 1 && (
                      <div
                        onClick={removeFieldsReference}
                        className="flex items-center space-x-3 cursor-pointer dark:text-gray-400 hover:dark:text-white duration-300"
                      >
                        <TrashIcon className="w-5" />
                        <h1>Hapus Referensi</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-b dark:border-[#353535]" />

              {/* category */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ViewGridAddIcon className="w-5" />
                  <h1>Kategori</h1>
                </div>
                <Listbox
                  value={articles.category}
                  onChange={(e) => handleChangeListbox(e)}
                >
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg border dark:border-[#363535] py-2 pl-3  text-left outline-none">
                      {category.loading ? (
                        <div className="h-6 w-1/2 animate-pulse bg-gray-500 rounded-md" />
                      ) : (
                        <span className="block truncate">
                          {articles?.category}
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
                        {Object.values(category.category)?.map(
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
                        )}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              <div className="border-b dark:border-[#353535]" />

              {/* hastag */}

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <HashtagIcon className="w-5" />
                  <h1>Hastag</h1>
                </div>
                <div className="space-y-1">
                  <h1 className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Opsional
                  </h1>
                  <Input
                    placeholder={"Hastag"}
                    name="hastag"
                    onChange={handleChangeInput}
                  />
                  <h1 className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Pisahkan hastag menggunakan koma
                  </h1>
                </div>
              </div>

              <div className="border-b dark:border-[#353535]" />

              <div className="lg:flex lg:space-x-2 space-y-3 lg:space-y-0">
                <Back />
                {articles.fetching ? <Loading /> : <Button label={"Kirim"} />}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Sub>
  );
}

export default Add;
