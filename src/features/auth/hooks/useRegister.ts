import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginRegisterResponse } from "../../../types";
import { registerApi } from "../api/authentication";
import { t } from "../../../context/translationService";
type RegisterVariables = {
  firstname: string;
  lastname: string;
  phone?: string;
  email: string;
  password: string;
};

const useRegister = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  RegisterVariables
> => {
  const mutation = useMutation<LoginRegisterResponse, Error, RegisterVariables>(
    {
      mutationFn: registerApi,
      onSuccess: () => {
        toast.success(t("welcome_message_register"));
      },
      onError: () => {
        toast.error(t("wrong_register"));
      },
    }
  );

  return mutation;
};

export default useRegister;
