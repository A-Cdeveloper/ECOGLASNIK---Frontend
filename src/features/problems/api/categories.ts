import { ProblemCategory } from "../../../types";
import apiClient from "../../../utils/axios";
import { throwError } from "../../../utils/helpers";

export const getCategoriesApi = async (): Promise<ProblemCategory[]> => {
  try {
    const response = await apiClient.get("/categories");
    return response.data.data; // Axios automatically parses the JSON response
  } catch (error) {
    return await throwError(error);
  }
};

export const getSingleCategoryApi = async (
  categoryId: number
): Promise<ProblemCategory> => {
  try {
    const response = await apiClient.get(`/categories/${categoryId}`);
    return response.data; // Axios automatically parses the JSON response
  } catch (error) {
    return await throwError(error);
  }
};
