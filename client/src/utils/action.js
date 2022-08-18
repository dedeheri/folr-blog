import apis from "../apis/api";
import config from "../apis/config";

function loginRequest(email, password, rememberMe) {
  return apis.post(
    "api/v1/auth/login",
    { email, password, rememberMe },
    config.headerJSON
  );
}
function registrationRequest(props) {
  return apis.post("api/v1/auth/registration", props);
}

function getUsersRequest() {
  return apis.get("api/v1/auth/user", config.headerJSON);
}

// articles
// get
function getArticlesRequest(limit, r) {
  return apis.get(`api/v1/articles?limit=${limit}&${r}`, config.headerJSON);
}

// detail
function getDetailArticlesRequest(id) {
  return apis.get(`api/v1/articles/${id}`, config.headerJSON);
}

const categoryRequest = () => apis.get("api/v1/category", config.headerJSON);
function updateCategory(id, category) {
  return apis.put(`api/v1/category/${id}`, { category }, config.headerJSON);
}
function deleteCategory(id) {
  return apis.delete(`api/v1/category/${id}`, config.headerJSON);
}

function addCategoryRequest(props) {
  return apis.post("api/v1/category/add", props, config.headerJSON);
}

// artikel
function addArticlesRequest(formData) {
  return apis.post("/api/v1/articles/add", formData, config.headerJSON);
}
function detailArticlesRequest(id) {
  return apis.get(`/api/v1/articles/${id}`, config.headerJSON);
}

async function getUsers(loading, user, message) {
  try {
    const { data } = await apis.get("api/v1/auth/user", config.headerJSON);
    loading(false);
    user(data);
  } catch (error) {
    loading(false);
    message(error.response.data);
  }
}

async function getUserss(id, name) {
  return apis.get(`api/v1/user/${id}/${name}`, config.headerJSON);
}

async function getUsersArticles(id, name, search, data) {
  try {
    data({ loading: true });
    const response = await apis.get(
      `api/v1/user/articles/${id}/${name}${search}`,
      config.headerJSON
    );
    data({
      data: response.data.data,
      pagination: response.data.pagination,
      loading: false,
    });
  } catch (error) {
    data({
      loading: false,
      error: error.response.data,
    });
  }
}

async function getUsersSessionRequest() {
  return apis.get(`api/v1/user/history`, config.headerJSON);
}

async function getTopics(loading, topics, select, message) {
  try {
    const response = await categoryRequest();
    loading(false);
    topics(response.data.data);
    select(response.data.data[0]);
  } catch (error) {
    loading(false);
    message(error);
  }
}

export {
  loginRequest,
  categoryRequest,
  getUsers,
  getTopics,
  addCategoryRequest,
  getUserss,
  getUsersArticles,
  getUsersSessionRequest,
  updateCategory,
  deleteCategory,
  detailArticlesRequest,
  getArticlesRequest,
  getUsersRequest,
  registrationRequest,
  addArticlesRequest,
  getDetailArticlesRequest,
};
