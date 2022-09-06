import api from "../../api/base";
import { API_REGISTRATION, API_USER } from "./api";

function loginRequest(email, password, rememberMe) {
  return api.post("api/v1/auth/login", { email, password, rememberMe });
}

async function registrationAction(data, props) {
  try {
    props((prev) => ({
      ...prev,
      fetching: true,
    }));

    const response = await API_REGISTRATION(data);

    props((prev) => ({
      ...prev,
      loading: false,
      success: true,
      message: response.data.message,
      fetching: false,
    }));

    if (response.status === 200) {
      setInterval(() => {
        window.location.href = "http://account.localhost:3000";
      }, 3000);
    }
  } catch (error) {
    props((prev) => ({
      ...prev,
      fetching: false,
      success: false,
      error: true,
      message: error.response.data,
    }));
  }
}

async function userRequest(user) {
  try {
    const { data } = await API_USER(user);
    user((prev) => ({
      ...prev,
      fullName: data.user.fullName,
      imageUrl: data.user.imageUrl,
      success: true,
      loading: false,
    }));
  } catch (error) {
    user((prev) => ({
      ...prev,
      loading: false,
      error: true,
      message: error.response.data,
    }));
  }
}

export { loginRequest, registrationAction, userRequest };
