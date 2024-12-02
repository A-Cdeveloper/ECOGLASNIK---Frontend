import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { forgotPasswordApi } from "../api/authentication";
import { LoginRegisterResponse } from "../../../types";

const useForgotPassword = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  { email: string }
> => {
  const mutation = useMutation<LoginRegisterResponse, Error, { email: string }>(
    {
      mutationFn: forgotPasswordApi,
      onError: () =>
        toast.error("Došlo je do greške prilikom zahteva za reset lozinke."),
    }
  );

  return mutation;
};

export default useForgotPassword;
