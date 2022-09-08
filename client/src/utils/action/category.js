import { GET_API_CATEGORY } from "./api";

async function getCategoryRequest(category) {
  try {
    const { data } = await GET_API_CATEGORY();
    category((prev) => ({
      ...prev,
      loading: false,
      success: true,
      data: data.data,
      message: "success",
    }));
  } catch (error) {
    console.log(error);
  }
}

export { getCategoryRequest };
