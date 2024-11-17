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
    onSuccess: (data) => {
      toast.success("Status Problema uspešno promenjen!");

      queryClient.invalidateQueries({
        queryKey: ["problem", { id: data.id }],
      });
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
    onError: (err: Error) => {
      toast.error(
        "Došlo je do greške pri promeni statusa problema." + err.message
      );
    },
  });

  return mutation;
};

export default useUpdateProblemStatus;
