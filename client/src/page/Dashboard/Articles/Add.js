import {
  PlusIcon,
  CheckIcon,
  SelectorIcon,
  TagIcon,
  HashtagIcon,
  PhotographIcon,
  DocumentSearchIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Transition, Listbox } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

// text

import { categoryRequest } from "../../../utils/action";

// components
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import api from "../../../apis/api";
import RichText from "../../../components/Dashboard/RichText";
import ImageUpload from "../../../components/Dashboard/ImageUpload";
import Loading from "../../../components/Loading";
import Back from "../../../components/Back";

// draft
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import ListBoxCategory from "../../../components/Dashboard/ListBoxCategory";

function Add() {
  // lables
  const [topics, setTopics] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // procces
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  // add
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState(EditorState.createEmpty());
  const [reference, setReference] = useState([]);
  const [label, setLabel] = useState("");
  const [hastag, setHastag] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlCredit, setImageUrlCredit] = useState("");

  const [listBoxCategory, setListBoxCategory] = useState("");
  const [articles, setArticles] = useState({
    title: "",
    description: "",
    reference: [],
    category: "",
    hastag: [],
    imageUrl: null,
    imageUrlCredit: null,
    imagePriview: null,
    fetching: false,
    message: null,
    success: false,
    error: false,
  });

  const [category, setCategory] = useState({
    category: [],
    error: "",
    loading: true,
  });

  // priview
  const [imagePriview, setImagePriview] = useState(null);
  // calling api
  useEffect(() => {
    async function getCategory() {
      try {
        const response = await categoryRequest();
        setCategory({
          category: response.data.data,
          loading: false,
        });
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
      setImagePriview(URL.createObjectURL(img));
      setImageUrl(img);
    }
  }

  function deleteImagePriview() {
    setImagePriview(null);
    setImageUrl(null);
  }

  function handleEditorState(description) {
    setDiscription(description);
  }

  const [increaseReference, setIncreaseReference] = useState([
    { reference: "" },
  ]);

  const handleDynamicReference = (index, event) => {
    let data = [...increaseReference];
    data[index][event.target.name] = event.target.value;
    setReference(data);
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

  async function handleAddArticles(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append(
      "description",
      draftToHtml(convertToRaw(description.getCurrentContent()))
    );
    formData.append("imageUrl", imageUrl);
    formData.append("imageUrlCredit", imageUrlCredit);
    for (let i = 0; i < reference.length; i++) {
      formData.append("reference", reference[i].reference);
    }
    formData.append("category", label?.category);
    formData.append("hastag", hastag.split(" "));

    try {
      setFetching(true);
      const data = await api.post("/api/v1/articles/add", formData);
      setFetching(false);
      setSuccess(data?.data?.message);
      if (data) {
        setInterval(() => {
          window.location.href = "/dashboard/articles";
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response.data);
      setFetching(false);
    }
  }

  console.log(category);

  return (
    <div className="space-y-3 pt-4 md:pt-8 px-4">
      {success && (
        <div className="dark:bg-green-700 bg-green-400 flex items-center px-5 h-10 w-full rounded-md">
          <h1 className="font-medium text-lg">{success}</h1>
        </div>
      )}

      {message?.message && (
        <div className="dark:bg-red-700 flex items-center px-5 h-10 w-full rounded-md">
          <h1 className="font-medium text-lg">{message?.message}</h1>
        </div>
      )}
      {error && (
        <div className="dark:bg-red-700 flex items-center px-5 h-10 w-full rounded-md">
          <h1 className="font-medium text-lg">{error}</h1>
        </div>
      )}

      <form
        onSubmit={handleAddArticles}
        className="grid grid-cols-1 lg:grid-cols-6 gap-6 pb-10 "
      >
        {/* success */}

        {/* main */}
        <div className="w-full h-full lg:col-span-4">
          <div className="border p-5 dark:border-[#353535] rounded-xl space-y-4">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Judul"}
              error={message?.validation?.title}
              message={message?.validation?.title?.msg}
            />

            {/* text area */}
            <RichText
              onEditorStateChange={handleEditorState}
              editorState={description}
              error={message?.validation?.description?.msg}
            />
          </div>
        </div>

        {/* featured */}
        <div className="w-full h-full lg:col-span-2 space-y-4">
          {/* thubmnail */}
          <div className="border dark:border-[#353535] rounded-xl ">
            <div className="flex items-center border-b dark:border-[#353535] px-4 space-x-2">
              <PhotographIcon className="w-5" />
              <h1 className=" py-2">Koper</h1>
            </div>

            <div className="px-4 py-2 space-y-2">
              <ImageUpload
                preview={imagePriview}
                error={message}
                onChange={handleImagePriview}
                deletePriview={deleteImagePriview}
              />
            </div>
            <div className="px-4 py-2 space-y-1">
              <Input
                link={true}
                onChange={(e) => setImageUrlCredit(e.target.value)}
                error={message?.validation?.imageUrlCredit}
                message={message?.validation?.imageUrlCredit?.msg}
                placeholder={"Sumber"}
              />
              <h1 className="text-sm text-gray-600 dark:text-gray-400 italic">
                Sumber Gambar
              </h1>
            </div>
          </div>

          {/* referensi */}
          <div className="border dark:border-[#353535] rounded-xl ">
            <div className="flex items-center border-b dark:border-[#353535] px-4 space-x-2">
              <DocumentSearchIcon className="w-5" />
              <h1 className=" py-2">Referensi</h1>
            </div>
            <div className="px-4 py-3 space-y-2">
              {increaseReference.map((_, index) => (
                <Input
                  link={true}
                  error={message?.validation?.reference}
                  message={message?.validation?.reference?.msg}
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

                {reference.length > 1 && (
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

          {/* category */}
          <div className="border dark:border-[#353535] rounded-xl ">
            <div className="flex items-center border-b dark:border-[#353535] px-4 space-x-2">
              <TagIcon className="w-5" />
              <h1 className="py-2">Label</h1>
            </div>

            {/* listbox */}
            <div className="px-4 py-3">
              <ListBoxCategory
                data={category.category}
                loading={category.loading}
                selected={category.category}
                select={listBoxCategory}
                value={listBoxCategory}
                onChange={setListBoxCategory}
              />
              {/* <Listbox value={label} onChange={setLabel}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg border dark:border-[#363535] py-2 pl-3  text-left outline-none">
                    {loading ? (
                      <div className="h-6 w-1/2 animate-pulse bg-gray-500 rounded-md" />
                    ) : (
                      <span className="block truncate">{label?.category}</span>
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
                    <Listbox.Options className="absolute  mt-1 max-h-52  w-full  overflow-auto rounded-md border dark:border-[#363535] bg-white dark:bg-black scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full  text-md z-40">
                      {Object.values(topics)?.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-green-200 dark:bg-[#055a2b] text-white dark:text-white"
                                : "text-white dark:text-white"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate text-black dark:text-white`}
                              >
                                {person.category}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#2BEF82]">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox> */}
            </div>
            {/* end lisbox */}
            <div className="px-4 py-2 flex items-center space-x-3">
              <PlusIcon className="w-5" />
              <h1>Tambah katagori</h1>
            </div>
          </div>

          {/* hastag */}
          <div className="border dark:border-[#353535] rounded-xl ">
            <div className="flex items-center border-b dark:border-[#353535] px-4 space-x-2">
              <HashtagIcon className="w-5" />
              <h1 className="py-2">Hastag</h1>
            </div>
            <div className="px-4 py-3 space-y-1">
              <h1 className="text-sm text-gray-600 dark:text-gray-400 italic">
                Opsional
              </h1>

              <Input
                placeholder={"Hastag"}
                onChange={(e) => setHastag(e.target.value)}
              />

              <h1 className="text-sm text-gray-600 dark:text-gray-400 italic">
                Pisahkan hastag menggunakan koma
              </h1>
            </div>
          </div>

          {/* button */}
          <div className="lg:flex lg:space-x-2 space-y-3 lg:space-y-0">
            <Back />
            {fetching ? <Loading /> : <Button label={"Kirim"} />}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Add;
