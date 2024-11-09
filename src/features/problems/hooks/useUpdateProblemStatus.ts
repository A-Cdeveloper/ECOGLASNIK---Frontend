import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Problem } from "../../../types";
import { updateProbemStatusApi } from "../api/problems";

const useUpdateProblemStatus = (): UseMutationResult<
  Problem,
  Error,
  Problem
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Problem, Error, Problem>({
    mutationFn: updateProbemStatusApi,
    onSuccess: () => {
      toast.success("Status Problema uspešno promenjen!");
      queryClient.invalidateQueries({ queryKey: ["problem"] }); // Optional: to refresh the problems query
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  return mutation;
};

export default useUpdateProblemStatus;
