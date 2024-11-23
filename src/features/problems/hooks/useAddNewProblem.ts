import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Problem } from "../../../types";
import { addNewProblemApi } from "../api/problems";

const useAddNewProblem = (): UseMutationResult<Problem, Error, Problem> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Problem, Error, Problem>({
    mutationFn: addNewProblemApi,
    onSuccess: () => {
      toast.success("Problem uspešno dodat!");
      queryClient.invalidateQueries({ queryKey: ["problems"] }); // Optional: to refresh the problems query
    },
    onError: () => {
      toast.error("Došlo je do greške pri dodavanju problema.");
    },
  });

  return mutation;
};

export default useAddNewProblem;
