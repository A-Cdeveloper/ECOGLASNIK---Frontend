import { useQuery } from "@tanstack/react-query";
import { ProblemCategory } from "../../../types";
import { getCategoriesApi } from "../api/categories";

export const useCategories = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<ProblemCategory[]>({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });

  return { categories, error, isLoading };
};
