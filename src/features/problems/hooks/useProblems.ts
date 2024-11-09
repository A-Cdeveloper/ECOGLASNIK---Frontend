import { useQuery } from "@tanstack/react-query";
import { Problems } from "../../../types";
import { getAllProblemsApi } from "../api/problems";
import { useUrlParams } from "../../../hooks/useUrlParams";

export const useProblems = () => {
  const { status, cat_id } = useUrlParams();

  const { data, error, isLoading } = useQuery<Problems>({
    queryKey: ["problems", status, cat_id],
    queryFn: () => getAllProblemsApi(status, cat_id),
  });
  return {
    problems: data,
    error,
    isLoading,
  };
};
