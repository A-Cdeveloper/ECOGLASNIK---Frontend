import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Problem } from "../../../types";
import { addNewProblemApi, updateProblemApi } from "../api/problems";
import { TranslationContext } from "../../../context/translationContext";
import { use } from "react";

const useAddEditProblem = (
  mode: string
): UseMutationResult<Problem, Error, Problem> => {
  const queryClient = useQueryClient();
  const { t } = use(TranslationContext);

  const mutation = useMutation<Problem, Error, Problem>({
    mutationFn: mode === "add" ? addNewProblemApi : updateProblemApi,
    onSuccess: () => {
      toast.success(
        `${
          mode === "add"
            ? t("problems.add.add_success")
            : t("problems.edit.edit_success_2")
        }!`
      );
      queryClient.invalidateQueries({ queryKey: ["problem"] });
      queryClient.invalidateQueries({ queryKey: ["problems"] }); // Optional: to refresh the problems query
    },
    onError: () => {
      toast.error(
        `${
          mode === "add"
            ? t("problems.add.add_error")
            : t("problems.edit.edit_error")
        }!`
      );
    },
  });

  return mutation;
};

export default useAddEditProblem;
