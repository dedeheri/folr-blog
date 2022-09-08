import api from "../../api/base";
import config from "../../api/config";

function getArticlesHomeRequest() {
  return api.get("api/v1/articles", config.headerJSON);
}

function DETAIL_ARTICLES_REQUEST(id) {
  return api.get(`api/v1/articles/${id}`, config.headerJSON);
}

function getArticlesTrendingHomeRequest() {
  return api.get("api/v1/articles/trends", config.headerJSON);
}

function addArticlesRequest(formData) {
  return api.post("api/v1/articles/add", formData, config.headerJSON);
}

function DELETE_ARTICLES(id) {
  return api.delete(`api/v1/articles/${id}`, config.headerJSON);
}

// category
function getCategoryRequest() {
  return api.get("api/v1/category", config.headerJSON);
}
function GET_API_CATEGORY() {
  return api.get("api/v1/category", config.headerJSON);
}

// account
function API_REGISTRATION(data) {
  return api.post("api/v1/auth/registration", data, config.headerJSON);
}
function API_USER() {
  return api.get("api/v1/auth/user", config.headerJSON);
}

export {
  getArticlesHomeRequest,
  getArticlesTrendingHomeRequest,
  API_REGISTRATION,
  getCategoryRequest,
  addArticlesRequest,
  API_USER,
  DETAIL_ARTICLES_REQUEST,
  GET_API_CATEGORY,
  DELETE_ARTICLES,
};
