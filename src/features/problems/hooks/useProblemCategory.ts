import { useQuery } from "@tanstack/react-query";
import { ProblemCategory } from "../../../types";
import { getSingleCategoryApi } from "../api/categories";

export const useProblemCategory = (categoryId: number) => {
  const {
    data: category,
    error,
    isLoading,
  } = useQuery<ProblemCategory>({
    queryKey: ["category", { categoryId }],
    queryFn: () => getSingleCategoryApi(categoryId),
    enabled: !!categoryId,
  });

  return { category, error, isLoading };
};
