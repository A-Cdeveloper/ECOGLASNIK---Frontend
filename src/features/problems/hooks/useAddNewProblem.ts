import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Problem } from "../../../types";
import { addNewProblemApi } from "../api/problems";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useAddNewProblem = (): UseMutationResult<Problem, Error, Problem> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<Problem, Error, Problem>({
    mutationFn: addNewProblemApi,
    onSuccess: () => {
      console.log("success");
      toast.success("Problem uspešno dodat!");
      queryClient.invalidateQueries({ queryKey: ["problems"] }); // Optional: to refresh the problems query
      navigate("/");
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  return mutation;
};

export default useAddNewProblem;
