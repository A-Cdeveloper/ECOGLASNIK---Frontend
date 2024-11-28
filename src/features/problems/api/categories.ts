import { API_URL } from "../../../constants";
import { ProblemCategory } from "../../../types";
import { throwError } from "../../../utils/helpers";

export const getCategoriesApi = async (): Promise<ProblemCategory[]> => {
  try {
    const response = await fetch(`${API_URL}/categories/`);
    const { data } = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return await throwError(error);
  }
};

export const getSingleCategoryApi = async (
  categoryId: number
): Promise<ProblemCategory> => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`);
    const { data } = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    return await throwError(error);
  }
};
