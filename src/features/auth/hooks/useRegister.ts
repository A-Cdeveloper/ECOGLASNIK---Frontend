import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { User } from "../../../types";
import { registerApi } from "../api/authentication";

type RegisterVariables = {
  firstname: string;
  lastname: string;
  phone?: string;
  email: string;
  password: string;
};

const useRegister = (): UseMutationResult<User, Error, RegisterVariables> => {
  const mutation = useMutation<User, Error, RegisterVariables>({
    mutationFn: registerApi,
    onSuccess: (data: User) => {
      toast.success(
        `Poštovani ${data.firstname} ${data.lastname}. Vaš nalog je uspešno iniciran!`
      );
    },
    onError: () => {
      toast.error("Došlo je do greške prilikom kreiranja naloga.");
    },
  });

  return mutation;
};

export default useRegister;
