import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { forgotPasswordApi } from "../api/authentication";
import { LoginRegisterResponse } from "../../../types";
import { t } from "../../../context/translationService";

const useForgotPassword = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  { email: string }
> => {
  const mutation = useMutation<LoginRegisterResponse, Error, { email: string }>(
    {
      mutationFn: forgotPasswordApi,
      onError: () => toast.error(t("wrong_password_forgot")),
    }
  );

  return mutation;
};

export default useForgotPassword;
