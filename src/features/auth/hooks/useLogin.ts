import { use } from "react";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginRegisterResponse } from "../../../types";

import { getUserFromCookies, loginApi } from "../api/authentication";
import { AuthContext } from "../../../context/authContext";
import { t } from "../../../context/translationService";

type LoginVariables = {
  email: string;
  password: string;
};

const useLogin = (): UseMutationResult<
  LoginRegisterResponse,
  Error,
  LoginVariables
> => {
  const { setUser, setTokenExpiry } = use(AuthContext);
  const mutation = useMutation<LoginRegisterResponse, Error, LoginVariables>({
    mutationFn: loginApi,
    onSuccess: async (data: LoginRegisterResponse) => {
      const user = await getUserFromCookies();
      setUser(user);
      setTokenExpiry(data.tokenExpiry);
      toast.success(
        `${data.message}\n ${t("welcome_message_login")} ${user.firstname} ${
          user.lastname
        }!`
      );
    },
    onError: (error) => {
      console.log(error);
      toast.error(t("wrong_login"));
    },
  });

  return mutation;
};

export default useLogin;
