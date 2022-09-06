import React, { useState } from "react";

// components
import Conauth from "../../../components/backend/Conauth";
import Input from "../../../components/backend/Utils/Input";
import Image from "../../../components/backend/Utils/Image";
import Password from "../../../components/backend/Utils/Password";
import Fetching from "../../../components/backend/Utils/Fetching";
import Button from "../../../components/backend/Utils/Button";
import TermCondition from "../../../components/backend/Term";
import { registrationAction } from "../../../utils/action/auth";
import ToastSuccess from "../../../components/backend/ToastSuccess";
import ToastError from "../../../components/backend/ToastError";

function Registration() {
  const [data, setData] = useState({
    fetching: false,
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

  // image
  function handelInputImage(e) {
    const image = e.target.files[0];
    if (image) {
      stateManipulation("imageUrl", image);
      stateManipulation("imageUrlPreview", URL.createObjectURL(image));
    }
  }

  function handleDeleteImage() {
    stateManipulation("imageUrl", "");
    stateManipulation("imageUrlPreview", "");
  }

  async function handleRegistration(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", data.imageUrl);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("privacyPolicies", data.privacyPolicies);

    await registrationAction(formData, setData);
  }

  return (
    <Conauth title={"Registrasi"}>
      <form className="space-y-3" onSubmit={handleRegistration}>
        {data.success && <ToastSuccess message={data?.message} />}
        {data?.message?.error?.message && (
          <ToastError message={data?.message?.error?.message} />
        )}

        <Image
          deletePriview={handleDeleteImage}
          onChange={handelInputImage}
          preview={data.imageUrlPreview}
          error={data?.message?.validation?.imageUrl?.msg}
        />
        <Input
          name="fullName"
          placeholder="Nama Lengkap"
          onChange={handleInput}
          error={data?.message?.validation?.fullName?.msg}
        />
        <Input
          name="email"
          placeholder="Email"
          onChange={handleInput}
          error={
            data?.message?.validation?.email?.msg ||
            data?.message?.email?.message
          }
        />
        <Password
          onChange={handleInput}
          name="password"
          error={data?.message?.validation?.password?.msg}
        />
        <TermCondition
          onChange={handleInputChecked}
          error={data?.message?.validation?.privacyPolicies?.msg}
        />
        {/* button */}
        {data.fetching ? <Fetching /> : <Button text={"Registrasi"} />}
      </form>
    </Conauth>
  );
}

export default Registration;
