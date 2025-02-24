import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginRegisterResponse } from "../../../types";
import { logoutApi } from "../api/authentication";

import { useNavigate } from "react-router-dom";
import { use } from "react";
import { AuthContext } from "../../../context/authContext";

const useLogout = (): UseMutationResult<LoginRegisterResponse, Error, void> => {
  const { removeSessionStorageData, user } = use(AuthContext);
  const navigation = useNavigate();
  const userId = user?.uid;

  const mutation = useMutation<LoginRegisterResponse, Error, void>({
    mutationFn: () => logoutApi(userId!),
    onSuccess: () => {
      removeSessionStorageData();
      toast.success(`Uspešno ste se odjavili!`);
      navigation("/");
    },
    onError: () => {
      toast.error("Došlo je do greške prilikom odjave.");
    },
  });

  return mutation;
};

export default useLogout;
