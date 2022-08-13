import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import api from "../../../apis/api";

// title
import { Helmet } from "react-helmet";
import LoadingDetail from "../../../components/Dashboard/LoadingDetail";
import LoadingUpdate from "../../../components/Dashboard/LoadingUpdate";
import NoData from "../../../components/NoData";
import RichText from "../../../components/Dashboard/RichText";
import Input from "../../../components/Input";
import {
  DocumentSearchIcon,
  PhotographIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import ImageUpload from "../../../components/Dashboard/ImageUpload";
import {
  CheckIcon,
  HashtagIcon,
  SelectorIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { Listbox, Transition } from "@headlessui/react";
import Loading from "../../../components/Loading";
import Button from "../../../components/Button";
import {
  categoryRequest,
  getTopics,
  detailArticlesRequest,
} from "../../../utils/action";
import Sub from "../../../components/Dashboard/Sub";
import ListBoxCategory from "../../../components/Dashboard/ListBoxCategory";

function Update() {
  const params = useParams();

  // state in articles
  const [detailArticles, setDetailArticles] = useState({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    imageUrlCredit: "",
    imagePreview: null,
    category: "",
    reference: [],
    hastag: [],
    loading: true,
    success: false,
    message: "",
    error: false,
  });

  // state category
  const [getCategory, setGetCategory] = useState({
    category: [],
    error: "",
    loading: true,
  });

  // state in category

  // state update
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [reference, setReference] = useState([]);
  const [listBoxCategory, setListBoxCategory] = useState("");
  const [hastag, setHastag] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlCredit, setImageUrlCredit] = useState("");

  // get category

  useEffect(() => {
    async function getArticle() {
      try {
        const response = await detailArticlesRequest(params.id);
        setDetailArticles({
          title: response?.data?.data?.title,
          imageUrlCredit: response?.data?.data?.imageUrlCredit,
          imageUrl: response?.data?.data?.imageUrl,
          reference: response?.data?.data?.reference,
          category: response?.data?.data?.category,
          description: response?.data?.data?.description,
          hastag: response?.data?.data?.hastag,
          loading: false,
          imagePreview: null,
        });
      } catch (error) {
        setDetailArticles({
          loading: false,
          error: error.response.data,
        });
      }
    }

    async function getCategory() {
      try {
        const response = await categoryRequest();
        setGetCategory({
          category: response.data.data,
          loading: false,
        });
      } catch (error) {
        setGetCategory({
          error: error.response.data,
          loading: false,
        });
      }
    }

    getArticle();
    getCategory();
  }, [params.id]);

  useEffect(() => {
    setDetailArticles((prev) => ({ ...prev, category: listBoxCategory }));
  }, [listBoxCategory]);

  function handleChangeImage(e) {
    setDetailArticles((prev) => ({
      ...prev,
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageUrl: e.target.files[0],
    }));
  }

  function handleChangeInput(e) {
    setDetailArticles((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleDynamicReference = (index, event) => {
    let data = [...detailArticles.reference];
    console.log(data);
    data[index][event.target.name] = event.target.value;
    setDetailArticles((prev) => ({ ...prev, reference: data }));
  };

  function addFieldsReference() {
    setDetailArticles((prev) => ({
      ...prev,
      reference: [...prev.reference, ""],
    }));
  }

  if (detailArticles.loading) {
    return <LoadingUpdate />;
  } else if (detailArticles.error) {
    return <NoData message={detailArticles.error.message} />;
  } else {
    return (
      <Sub title={detailArticles.title}>
        <div className="space-y-3">
          <form className="grid grid-cols-1 lg:grid-cols-6 gap-6 pb-10 ">
            {/* section 1 */}
            <div className="w-full h-full lg:col-span-4">
              <div className="border p-5 dark:border-[#353535] rounded-xl space-y-4">
                {/* title */}
                <Input
                  placeholder={"Judul"}
                  name="title"
                  onChange={handleChangeInput}
                  defaultValue={detailArticles.title}
                />
                {/* text area */}
                <RichText value={description} />
              </div>
            </div>
            {/* section 2 */}
            <div className="w-full h-full lg:col-span-2 space-y-4">
              {/* thubmnail */}
              <div className="border dark:border-[#353535] rounded-xl ">
                <div className="flex items-center border-b dark:border-[#353535] px-4 space-x-2">
                  <PhotographIcon className="w-5" />
                  <h1 className=" py-2">Koper</h1>
                </div>

                <div className="px-4 py-2 space-y-2">
                  <ImageUpload
                    onChange={handleChangeImage}
                    preview={
                      detailArticles.imagePreview === null
                        ? process.env.REACT_APP_URL_API_DEVELOPMENT +
                          detailArticles.imageUrl
                        : detailArticles.imagePreview
                    }
                  />
                </div>
                <div className="px-4 py-2 space-y-1">
                  <Input
                    link={true}
                    placeholder={"Sumber"}
                    name={"imageUrlCredit"}
                    onChange={handleChangeInput}
                    defaultValue={detailArticles.imageUrlCredit}
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
                  {detailArticles.reference.map((_, index) => (
                    <Input
                      link={true}
                      placeholder={"referensi"}
                      key={index}
                      name="reference"
                      defaultValue={_}
                      onChange={(event) => handleDynamicReference(index, event)}
                    />
                  ))}
                  <div className="flex justify-between">
                    <div
                      onClick={addFieldsReference}
                      className="flex items-center space-x-3 cursor-pointer dark:text-gray-400 dark:hover:text-green-500 duration-300"
                    >
                      <PlusIcon className="w-5" />
                      <h1>Tambah Referensi</h1>
                    </div>

                    {reference.length > 1 && (
                      <div className="flex items-center space-x-3 cursor-pointer dark:text-gray-400 dark:hover:text-red-500 duration-300">
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
                <div className="px-4 py-3">
                  <ListBoxCategory
                    loading={getCategory.loading}
                    value={listBoxCategory}
                    onChange={setListBoxCategory}
                    select={listBoxCategory}
                    data={getCategory.category}
                    selected={detailArticles.category}
                  />
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
                    defaultValue={detailArticles.hastag}
                    name="hastag"
                    onChange={handleChangeInput}
                  />

                  <h1 className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Pisahkan hastag menggunakan koma
                  </h1>
                </div>
              </div>

              {/* button */}
              <div className="lg:flex lg:space-x-2 space-y-3 lg:space-y-0">
                <div className="bg-gray-600 hover:bg-gray-700 dark:bg-[#363535] hover:dark:bg-[#323030] duration-300 rounded-md h-11 w-full flex justify-center items-center cursor-pointer">
                  <h1 className="text-white text-lg font-medium">Batal</h1>
                </div>
                {false ? <Loading /> : <Button label={"Kirim"} />}
              </div>
            </div>
          </form>
        </div>
      </Sub>
    );
  }
}

export default Update;
