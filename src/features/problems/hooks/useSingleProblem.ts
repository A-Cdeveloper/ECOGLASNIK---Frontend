import { useQuery } from "@tanstack/react-query";
import { Problem } from "../../../types";
import { getSingleProblemApi } from "../api/problems";

export const useSingleProblem = (id: string) => {
  const { data, error, isLoading } = useQuery<Problem>({
    queryKey: ["problem", { id }],
    queryFn: () => getSingleProblemApi(id),
  });

  return {
    problem: data,
    error,
    isLoading,
  };
};
