import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Problem } from "../../../types";
import { updateProbemStatusApi } from "../api/problems";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useUpdateProblemStatus = (): UseMutationResult<
  Problem,
  Error,
  Problem
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<Problem, Error, Problem>({
    mutationFn: updateProbemStatusApi,
    onSuccess: () => {
      console.log("success");
      toast.success("Status Problema uspešno promenjen!");
      queryClient.invalidateQueries({ queryKey: ["problems"] }); // Optional: to refresh the problems query
      navigate("/");
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  return mutation;
};

export default useUpdateProblemStatus;
