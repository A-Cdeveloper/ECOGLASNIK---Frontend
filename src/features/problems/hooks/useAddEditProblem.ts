import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Problem } from "../../../types";
import { addNewProblemApi, updateProblemApi } from "../api/problems";

const useAddEditProblem = (
  mode: string
): UseMutationResult<Problem, Error, Problem> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Problem, Error, Problem>({
    mutationFn: mode === "add" ? addNewProblemApi : updateProblemApi,
    onSuccess: () => {
      toast.success(
        `${
          mode === "add"
            ? "Problem je uspešno kreiran i čeka na odobrenje administratora"
            : "Problem je uspešno izmenjen."
        }!`
      );
      queryClient.invalidateQueries({ queryKey: ["problem"] });
      queryClient.invalidateQueries({ queryKey: ["problems"] }); // Optional: to refresh the problems query
    },
    onError: () => {
      toast.error(
        `Došlo je do greške pri ${
          mode === "add" ? "dodavanju" : "izmeni"
        } problema.`
      );
    },
  });

  return mutation;
};

export default useAddEditProblem;
