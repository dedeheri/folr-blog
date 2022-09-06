import {
  DETAIL_ARTICLES_REQUEST,
  getArticlesHomeRequest,
  getCategoryRequest,
} from "./api";

async function getArticles(articles) {
  try {
    const response = await getArticlesHomeRequest();
    articles((prev) => ({
      ...prev,
      loading: false,
      success: true,
      data: response.data.data,
      page: response.data.page,
    }));
  } catch (error) {
    console.log(error);
  }
}

async function getArticlesTrends(trending) {
  try {
    const response = await getArticlesHomeRequest();
    trending((prev) => ({
      ...prev,
      loading: false,
      success: true,
      data: response.data.data,
    }));
  } catch (error) {
    console.log(error);
  }
}

async function getCategory(category, articles) {
  try {
    const response = await getCategoryRequest();
    category({
      category: response.data.data,
      loading: false,
    });
    articles((prev) => ({
      ...prev,
      category: response.data.data[0].category,
    }));
  } catch (error) {
    category({
      error: error.response.data,
      loading: false,
    });
  }
}

async function getDetail(id, articles) {
  try {
    const response = await DETAIL_ARTICLES_REQUEST(id);
    articles((prev) => ({
      ...prev,
      loading: false,
      success: true,
      message: "",
      data: response.data.data,
    }));
  } catch (error) {
    console.log(error);
  }
}

export { getArticles, getArticlesTrends, getCategory, getDetail };
