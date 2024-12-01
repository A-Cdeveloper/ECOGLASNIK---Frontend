import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginRegisterResponse } from "../../../types";
import { registerApi } from "../api/authentication";

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
        toast.success("Nalog uspešno kreiran!");
      },
      onError: () => {
        toast.error("Došlo je do greške prilikom kreiranja naloga.");
      },
    }
  );

  return mutation;
};

export default useRegister;
