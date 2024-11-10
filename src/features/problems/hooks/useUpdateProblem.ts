import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Problem } from "../../../types";
import { updateProblemApi } from "../api/problems";

const useUpdateProblem = (): UseMutationResult<Problem, Error, Problem> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Problem, Error, Problem>({
    mutationFn: updateProblemApi,
    onSuccess: () => {
      toast.success("Problem uspešno promenjen!");
      queryClient.invalidateQueries({ queryKey: ["problem"] }); // Optional: to refresh the problems query
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  return mutation;
};

export default useUpdateProblem;
