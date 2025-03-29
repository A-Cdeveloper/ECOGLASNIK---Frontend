import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPasswordApi } from "../api/authentication";
import { t } from "../../../context/translationService";
const useResetPassword = (): UseMutationResult<
  { message: string },
  Error,
  { password: string; verificationCode: string }
> => {
  const mutation = useMutation<
    { message: string },
    Error,
    { password: string; verificationCode: string }
  >({
    mutationFn: resetPasswordApi,
    onError: () => toast.error(t("wrong_password_reset")),
  });

  return mutation;
};

export default useResetPassword;
