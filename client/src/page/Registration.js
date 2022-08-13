import React, { useState } from "react";

import apis from "../apis/api";

import { SpeakerphoneIcon } from "@heroicons/react/outline";

import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Password from "../components/Password";
import Upload from "../components/Upload";

import { logo } from "../assets/image";

function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPriviewImage] = useState("");

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);

  function handleImage(e) {
    const image = e.target.files[0];
    if (image) {
      setPriviewImage(URL.createObjectURL(image));
      setImageUrl(image);
    }
  }

  function handleDeleteImage() {
    setImageUrl("");
    setPriviewImage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("imageUrl", imageUrl);

    try {
      setFetching(true);
      const data = await apis.post("api/v1/auth/registration", formData);
      setSuccess(true);
      setFetching(false);

      if (data.status === 200) {
        setInterval(() => {
          window.location.href = "/auth";
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response.data);
      setFetching(false);
    }
  }

  return (
    <div className="w-[22rem] mx-auto min-h-screen flex items-center">
      <form onSubmit={handleSubmit} className=" w-full space-y-14">
        <div className="space-y-5 ">
          {success && (
            <div className="bg-gray-100 dark:bg-[#353535] p-2 rounded-md flex items-center space-x-2">
              <SpeakerphoneIcon className="w-6 text-[#00AB4C] dark:text-[#2BEF82]" />
              <h1 className="text-[#00AB4C] dark:text-[#2BEF82] text-lg">
                E-mail berhasil dibuat
              </h1>
            </div>
          )}

          <Upload
            onChange={handleImage}
            view={previewImage}
            deleted={handleDeleteImage}
            error={message?.validation?.imageUrl?.msg}
            message={message?.validation?.imageUrl?.msg}
          />

          <Input
            label={"Nama Lengkap"}
            placeholder={"Nama Lengkap"}
            type={"text"}
            onChange={(e) => setFullName(e.target.value)}
            error={message?.validation?.fullName?.msg}
            message={message?.validation?.fullName?.msg}
          />
          <Input
            label={"Email"}
            placeholder={"Email"}
            type={"text"}
            onChange={(e) => setEmail(e.target.value)}
            error={message?.validation?.email?.msg || message?.message}
            message={message?.validation?.email?.msg || message?.message}
          />
          <Password
            label={"Kata Sandi"}
            placeholder={"Kata Sandi"}
            type={"Kata Sandi"}
            onChange={(e) => setPassword(e.target.value)}
            error={message?.validation?.password?.msg}
            message={message?.validation?.password?.msg}
          />

          {fetching ? <Loading /> : <Button label={"Registasi"} />}
        </div>
      </form>
    </div>
  );
}

export default Registration;
