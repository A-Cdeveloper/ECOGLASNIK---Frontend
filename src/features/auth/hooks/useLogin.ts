import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginRegisterResponse } from "../../../types";
import { loginApi } from "../api/authentication";
//import useAuth from "../../../context/useAuth";

type LoginVariables = {
  email: string;
  password: string;
};

const useLogin = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  LoginVariables
> => {
  //const { setSessionStorageData } = useAuth();
  const mutation = useMutation<LoginRegisterResponse, Error, LoginVariables>({
    mutationFn: loginApi,
    onSuccess: (data: LoginRegisterResponse) => {
      toast.success(
        `${data.message}\n Dobrodosli ${data.data.firstname} ${data.data.lastname}!`
      );
    },
    onError: () => {
      toast.error("Došlo je do greške prilikom prijave.");
    },
  });

  return mutation;
};

export default useLogin;
