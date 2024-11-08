import { useQuery } from "@tanstack/react-query";
import { Problems } from "../../../types";
import { getAllProblemsApi } from "../api/problems";
import { useUrlParams } from "../../../hooks/useUrlParams";

export const useProblems = () => {
  const { solved, cat_id } = useUrlParams();

  const { data, error, isLoading } = useQuery<Problems>({
    queryKey: ["problems", solved, cat_id],
    queryFn: () => getAllProblemsApi(solved, cat_id),
  });
  return {
    problems: data,
    error,
    isLoading,
  };
};
