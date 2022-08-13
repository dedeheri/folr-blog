import axios from "axios";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import config from "../apis/config";

import Button from "../components/Button";
import Href from "../components/Href";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Password from "../components/Password";
import Checkbox from "../components/Checkbox";

// utlis
import detectDevice from "../utils/detect";
import { loginRequest } from "../utils/action";
import { ExclamationIcon } from "@heroicons/react/outline";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [fetching, setFetching] = useState("");

  const [deviceUser, setDeviceUser] = useState("");

  useEffect(() => {
    detectDevice(setDeviceUser);
  }, [deviceUser]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setFetching(true);
      const data = await loginRequest(email, password, rememberMe);
      setFetching(false);
      if (data) {
        window.location.href = "http://localhost:3000/dashboard";
      }
    } catch (error) {
      setFetching(false);
      setError(error.response.data);
    }
  }

  return (
    <div className="w-[22rem]  mx-auto min-h-screen flex items-center">
      <form onSubmit={handleLogin} className=" w-full space-y-14">
        <h1 className="text-6xl font-bold text-center text-[#00AB4C] dark:text-[#2BEF82]">
          Folr
        </h1>

        <div className="space-y-5 ">
          {error?.message && (
            <div className="bg-gray-100 dark:bg-[#353535] p-2 rounded-md flex items-center space-x-2">
              <ExclamationIcon className="w-6 text-red-400 dark:text-500" />
              <h1 className="text-red-400 dark:text-500 text-lg">
                {error?.message}
              </h1>
            </div>
          )}

          <Input
            label={"Email"}
            placeholder={"Email"}
            type={"email"}
            error={error?.validation?.email?.msg || error?.message?.email}
            message={error?.validation?.email?.msg || error?.message?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            label={"Kata Sandi"}
            placeholder={"Kata Sandi"}
            type={"Kata Sandi"}
            error={error?.validation?.password?.msg || error?.message?.password}
            message={
              error?.validation?.password?.msg || error?.message?.password
            }
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label={"Tetap masuk"}
              value={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />

            <Link to="register">
              <h1 className="text-md text-gray-400 hover:text-gray-500 hover:dark:text-gray-300 duration-300">
                Lupa Kata Sandi?
              </h1>
            </Link>
          </div>

          {fetching ? <Loading /> : <Button label={"Masuk"} />}
          <Href label={"Registrasi"} href={"registration"} />
        </div>
      </form>
    </div>
  );
}

export default Login;
