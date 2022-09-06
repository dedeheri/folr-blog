import React, { useState } from "react";

import cookie from "js-cookie";

// compontent
import Input from "../../../components/backend/Utils/Input";
import Password from "../../../components/backend/Utils/Password";
import Button from "../../../components/backend/Utils/Button";
import Fetching from "../../../components/backend/Utils/Fetching";
import Conauth from "../../../components/backend/Conauth";
import Checkbox from "../../../components/backend/Utils/Checkbox";

// action
import { loginRequest } from "../../../utils/action/auth";
import ToastSuccess from "../../../components/backend/ToastSuccess";
import Href from "../../../components/backend/Utils/Href";

function Login() {
  const [form, setForm] = useState({
    user: {},
    email: "",
    password: "",
    rememberMe: true,
    fetching: false,
    error: false,
    success: false,
    message: "",
  });

  function handleInput(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      rememberMe: e.target.checked,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setForm((prev) => ({ ...prev, fetching: true }));
      const response = await loginRequest(
        form.email,
        form.password,
        form.rememberMe
      );
      setForm((prev) => ({
        ...prev,
        fetching: false,
        success: true,
        user: response.data,
      }));

      if (response.status === 200) {
        setInterval(() => {
          window.location.href = "http://dashboard.localhost:3000/";
        }, 3000);
      }
    } catch (error) {
      setForm((prev) => ({
        ...prev,
        fetching: false,
        success: false,
        error: true,
        message: error.response.data,
      }));
    }
  }

  return (
    <Conauth title={"Masuk"}>
      <form onSubmit={handleSubmit} className=" space-y-3">
        {form.success && <ToastSuccess message={form?.user?.message} />}

        <Input
          error={
            form?.message?.validation?.email?.msg ||
            form?.message?.message?.email
          }
          name="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <Password
          error={
            form?.message?.validation?.password?.msg ||
            form?.message?.message?.password
          }
          name="password"
          onChange={handleInput}
        />
        <div className="flex items-center justify-between">
          <Checkbox onChange={handleInput} defaultValue={form.checkbox} />
          <h1 className="text-gray-400 hover:text-gray-500 hover:dark:text-gray-300 duration-300 cursor-pointer">
            Lupa Kata Sandi?
          </h1>
        </div>
        {form.fetching ? <Fetching /> : <Button text={"Masuk"} />}
        <Href href={"/registration"} color={"bg-[#2374E1]"} text="Registrasi" />
      </form>
    </Conauth>
  );
}

export default Login;
