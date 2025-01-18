import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAuth from "../../../context/useAuth";
import { LoginRegisterResponse } from "../../../types";

import { getUserFromCookies, loginApi } from "../api/authentication";

type LoginVariables = {
  email: string;
  password: string;
};

const useLogin = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  LoginVariables
> => {
  const { setUser, setTokenExpiry } = useAuth();
  const mutation = useMutation<LoginRegisterResponse, Error, LoginVariables>({
    mutationFn: loginApi,
    onSuccess: async (data: LoginRegisterResponse) => {
      const user = await getUserFromCookies();
      setUser(user);
      setTokenExpiry(data.tokenExpiry);
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
