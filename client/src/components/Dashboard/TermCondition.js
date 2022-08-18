import { ExclamationIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Modal from "./Modal";

function TermCondition({ error, ...rest }) {
  const [showTermCondition, setShowTermCondition] = useState(false);
  const [showTermPrivacy, setShowTermPrivacy] = useState(false);

  function handleShowPrivacy() {
    setShowTermPrivacy((prev) => !prev);
  }
  function handleShowTerm() {
    setShowTermCondition((prev) => !prev);
  }

  return (
    <div className="">
      <div className="flex space-x-3">
        <input
          type="checkbox"
          className="cursor-pointer"
          name="term"
          {...rest}
        />
        <h1 className="leading-5 text-gray-600">
          Saya setuju dengan{" "}
          <span
            onClick={handleShowTerm}
            className="font-medium text-[#2374e1] hover:text-[#0f5abb] cursor-pointer duration-300"
          >
            Syarat Ketentuan
          </span>{" "}
          dan{" "}
          <span
            onClick={handleShowPrivacy}
            className="font-medium text-[#2374e1] hover:text-[#0f5abb] cursor-pointer duration-300"
          >
            Kebijakan Privasi
          </span>
        </h1>
      </div>

      {error && (
        <div className="flex space-x-2 text-red-400 pt-2">
          <ExclamationIcon className="w-4" />
          <h1 className="text-md">{error}</h1>
        </div>
      )}

      <Modal
        show={showTermCondition}
        label={"Syarat dan Ketentuan"}
        close={setShowTermCondition}
      >
        <div className="text-black dark:text-white">
          <h1>a</h1>
        </div>
      </Modal>
      <Modal
        show={showTermPrivacy}
        label={"Kebijakan Privasi"}
        close={handleShowPrivacy}
      >
        <div className="text-black dark:text-white">
          <h1>a</h1>
        </div>
      </Modal>
    </div>
  );
}

export default TermCondition;
