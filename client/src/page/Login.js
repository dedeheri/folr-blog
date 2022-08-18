import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Href from "../components/Href";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Password from "../components/Password";
import Checkbox from "../components/Checkbox";

// utlis
import { loginRequest } from "../utils/action";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    message: "",
    error: false,
    success: false,
  });

  function handleSubmitEvent(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      rememberMe: e.target.checked,
    }));
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("rememberMe", data.rememberMe);

      setData((prev) => ({ ...prev, fetching: true }));
      await loginRequest(data.email, data.password, data.rememberMe);
      setData((prev) => ({ ...prev, fetching: false }));
      setData((prev) => ({ ...prev, success: true }));

      if (data) {
        window.location.href = "http://localhost:3000/dashboard";
      }
    } catch (error) {
      console.log(error);
      setData((prev) => ({ ...prev, fetching: false }));
      setData((prev) => ({ ...prev, error: true }));
      setData((prev) => ({ ...prev, message: error.response.data }));
    }
  }

  return (
    <div className="w-[22rem] mx-auto flex items-center mt-20">
      <form onSubmit={handleLogin} className=" w-full space-y-14">
        <div className="space-y-5">
          <Input
            label={"Email"}
            placeholder={"Email"}
            type={"email"}
            error={
              data?.message?.validation?.email?.msg ||
              data?.message?.message?.email
            }
            name="email"
            onChange={handleSubmitEvent}
          />
          <Password
            label={"Kata Sandi"}
            placeholder={"Kata Sandi"}
            type={"Kata Sandi"}
            error={
              data?.message?.validation?.password?.msg ||
              data?.message?.message?.password
            }
            name="password"
            onChange={handleSubmitEvent}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label={"Tetap masuk"}
              name="rememberMe"
              onChange={handleSubmitEvent}
            />

            <Link to="register">
              <h1 className="text-md text-gray-400 hover:text-gray-500 hover:dark:text-gray-300 duration-300">
                Lupa Kata Sandi?
              </h1>
            </Link>
          </div>
          <div className="space-y-3">
            {data.fetching ? <Loading /> : <Button label={"Masuk"} />}
            <Href label={"Registrasi"} href={"registration"} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
