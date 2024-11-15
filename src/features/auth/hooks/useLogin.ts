import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { User } from "../../../types";
import { loginApi } from "../api/authentication";

type LoginVariables = {
  email: string;
  password: string;
};

const useLogin = (): UseMutationResult<User, Error, LoginVariables> => {
  const mutation = useMutation<User, Error, LoginVariables>({
    mutationFn: loginApi,
    onSuccess: (data: User) => {
      toast.success(`Dobrodošli ${data.firstname} ${data.lastname}!`);
    },
    onError: () => {
      toast.error("Došlo je do greške prilikom prijave.");
    },
  });

  return mutation;
};

export default useLogin;
