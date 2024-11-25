import { API_URL } from "../../../constants";
import { ProblemCategory } from "../../../types";

export const getCategoriesApi = async (): Promise<ProblemCategory[]> => {
  try {
    const response = await fetch(`${API_URL}/categories/`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch categories: ${response.status} ${response.statusText}`
      );
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    // Check if the error is an instance of the Error object to get a better message
    const errorMessage =
      error instanceof Error && "Servis trenutno nije dustupan.⚠";
    throw new Error(`${errorMessage}`);
  }
};

export const getSingleCategoryApi = async (
  categoryId: number
): Promise<ProblemCategory> => {
  try {
    const response = await fetch(`${API_URL}/categories/${categoryId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch categorys: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    // Check if the error is an instance of the Error object to get a better message
    const errorMessage =
      error instanceof Error && "Servis trenutno nije dustupan.⚠";
    throw new Error(`${errorMessage}`);
  }
};
