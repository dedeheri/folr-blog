import React, { useState } from "react";

// components
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Password from "../components/Password";
import Back from "../components/Back";
import Sub from "../components/Dashboard/Sub";
import ImageUpload from "../components/Dashboard/ImageUpload";
import TermCondition from "../components/Dashboard/TermCondition";

// action
import { registrationRequest } from "../utils/action";

function Registration() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    imageUrl: "",
    imageUrlPreview: "",
    success: false,
    message: "",
    fetching: false,
    privacyPolicies: false,
  });

  function stateManipulation(key, value) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleInput(e) {
    stateManipulation([e.target.name], e.target.value);
  }
  function handleInputChecked(e) {
    stateManipulation("privacyPolicies", e.target.checked);
  }

  console.log(data);

  function handleImage(e) {
    const image = e.target.files[0];
    if (image) {
      stateManipulation("imageUrlPreview", URL.createObjectURL(image));
      stateManipulation("imageUrl", image);
    }
  }

  function handleDeleteImage() {
    setData((prev) => ({
      ...prev,
      imageUrlPreview: "",
      imageUrl: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("imageUrl", data.imageUrl);
    formData.append("privacyPolicies", data.privacyPolicies);

    try {
      stateManipulation("fetching", true);

      const data = await registrationRequest(formData);
      stateManipulation("fetching", false);
      stateManipulation("success", true);
      stateManipulation("message", data.data.message);

      if (data.status === 200) {
        setInterval(() => {
          window.location.href = "/auth";
        }, 3000);
      }
    } catch (error) {
      stateManipulation("message", error.response.data);
      stateManipulation("success", false);
      stateManipulation("fetching", false);
    }
  }

  return (
    <Sub title={"Registrasi"}>
      <div className="md:w-[22rem] w-full mx-auto flex items-center mt-20 px-4">
        <form onSubmit={handleSubmit} className=" w-full space-y-14">
          <div className="space-y-5 ">
            {data.success && (
              <div className="dark:bg-green-700 bg-green-400 flex items-center px-5 h-10 w-full rounded-md">
                <h1 className="font-medium text-lg">{data.message}</h1>
              </div>
            )}

            <ImageUpload
              onChange={handleImage}
              preview={data.imageUrlPreview}
              deletePriview={handleDeleteImage}
              error={data?.message?.validation?.imageUrl?.msg}
            />

            <Input
              name="fullName"
              label={"Nama Lengkap"}
              placeholder={"Nama Lengkap"}
              type={"text"}
              onChange={handleInput}
              error={data?.message?.validation?.fullName?.msg}
            />
            <Input
              name="email"
              label={"Email"}
              placeholder={"Email"}
              type={"text"}
              onChange={handleInput}
              error={
                data?.message?.validation?.email?.msg || data?.message?.message
              }
            />
            <Password
              name="password"
              label={"Kata Sandi"}
              placeholder={"Kata Sandi"}
              type={"Kata Sandi"}
              onChange={handleInput}
              error={data?.message?.validation?.password?.msg}
            />
            <TermCondition
              error={data?.message?.validation?.privacyPolicies?.msg}
              checked={data.privacyPolicies}
              onChange={handleInputChecked}
            />

            <div className="space-y-3">
              {data.fetching ? <Loading /> : <Button label={"Registasi"} />}
              <Back />
            </div>
          </div>
        </form>
      </div>
    </Sub>
  );
}

export default Registration;
