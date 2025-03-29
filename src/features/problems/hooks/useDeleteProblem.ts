import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProblemApi } from "../api/problems";

import { Problem } from "../../../types";
import { TranslationContext } from "../../../context/translationContext";
import { use } from "react";

const useDeleteProblem = (): UseMutationResult<Problem, Error, string> => {
  const queryClient = useQueryClient();
  const { t } = use(TranslationContext);

  const mutation = useMutation<Problem, Error, string>({
    mutationFn: deleteProblemApi, // This is the function to delete the problem
    onSuccess: (data: Problem) => {
      toast.success(
        t("problems.delete.delete_success").replace("{title}", data.title || "")
      );
      queryClient.invalidateQueries({ queryKey: ["problems"] }); // Optional: refresh the problems query
    },
    onError: (err: Error) => {
      toast.error(t("problems.delete.delete_error") + err.message);
    },
  });

  return mutation;
};

export default useDeleteProblem;
