import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginRegisterResponse } from "../../../types";
import { logoutApi } from "../api/authentication";
import useAuth from "../../../context/useAuth";

const useLogout = (): UseMutationResult<LoginRegisterResponse, Error, void> => {
  const { removeSessionStorageData } = useAuth();
  const mutation = useMutation<LoginRegisterResponse, Error, void>({
    mutationFn: logoutApi,
    onSuccess: () => {
      removeSessionStorageData();
      toast.success(`Uspešno ste se odjavili!`);
    },
    onError: () => {
      toast.error("Došlo je do greške prilikom prijave.");
    },
  });

  return mutation;
};

export default useLogout;
