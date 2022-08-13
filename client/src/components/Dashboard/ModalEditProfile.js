import { XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

import Input from "../Input";
import Button from "../Button";
import ImageUpload from "../Dashboard/ImageUpload";
import Modal from "./Modal";

function ModalEditProfile({ open, setOpen, data, ...rest }) {
  const [user, setUsers] = useState({
    fullName: data?.data?.fullName,
    email: data?.data?.email,
    imageUrl: data?.data?.imageUrl,
  });

  function handleChange(e) {}

  function handleClose() {
    setOpen((open) => !open);
  }

  return (
    <Modal show={open} label={"Edit Profil"} close={handleClose}>
      <div className="space-y-2 pt-8  p-5 dark:text-white text-black">
        <ImageUpload
          preview={process.env.REACT_APP_URL_API_DEVELOPMENT + user.imageUrl}
        />
        <Input
          placeholder={"Nama Lengkap"}
          value={user.fullName}
          name="fullName"
          onChange={handleChange}
        />
        <Input
          placeholder={"Email"}
          value={user.email}
          name="email"
          onChange={handleChange}
        />
        <Button label={"Edit"} />
      </div>
    </Modal>
  );
}

export default ModalEditProfile;
