import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProblemApi } from "../api/problems";

import { useNavigate } from "react-router-dom";
import { Problem } from "../../../types";

const useDeleteProblem = (): UseMutationResult<Problem, Error, string> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<Problem, Error, string>({
    mutationFn: deleteProblemApi, // This is the function to delete the problem
    onSuccess: (data: Problem) => {
      // Now `data` is the deleted `Problem` object
      toast.success(`Problem ${data.title} je uklonjen!`);
      navigate("/"); // Navigate to home page after deletion
      queryClient.invalidateQueries({ queryKey: ["problem"] }); // Optional: refresh the problems query
    },
    onError: (err: Error) => {
      console.error("Error deleting problem:", err.message);
      toast.error("Došlo je do greške pri uklanjanju problema.");
    },
  });

  return mutation;
};

export default useDeleteProblem;
