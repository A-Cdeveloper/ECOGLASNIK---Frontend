import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { User } from "../../../types";
import { loginApi } from "../api/authentication";
//import useAuth from "../../../context/useAuth";

type LoginVariables = {
  email: string;
  password: string;
};

const useLogin = (): UseMutationResult<User, Error, LoginVariables> => {
  //const { setSessionStorageData } = useAuth();
  const mutation = useMutation<User, Error, LoginVariables>({
    mutationFn: loginApi,
    onSuccess: (data: User) => {
      toast.success(`Dobrodošli ${data.firstname} ${data.lastname}!`);

      // TODO
      // setSessionStorageData({
      //   uid: data.uid,
      //   email: data.email,
      //   firstname: data.firstname,
      //   lastname: data.lastname,
      //   accessToken: data.accessToken,
      //   refreshToken: data.refreshToken,
      //   phone: data.phone,
      // });
    },
    onError: () => {
      toast.error("Došlo je do greške prilikom prijave.");
    },
  });

  return mutation;
};

export default useLogin;
