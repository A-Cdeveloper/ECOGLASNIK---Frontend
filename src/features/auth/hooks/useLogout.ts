import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LoginRegisterResponse } from "../../../types";
import { logoutApi } from "../api/authentication";

import { useNavigate } from "react-router-dom";
import { use } from "react";
import { AuthContext } from "../../../context/authContext";
import { t } from "../../../context/translationService";
const useLogout = (): UseMutationResult<LoginRegisterResponse, Error, void> => {
  const { removeSessionStorageData, user } = use(AuthContext);
  const navigation = useNavigate();
  const userId = user?.uid;

  const mutation = useMutation<LoginRegisterResponse, Error, void>({
    mutationFn: () => logoutApi(userId!),
    onSuccess: () => {
      removeSessionStorageData();
      toast.success(t("welcome_message_logout"));
      navigation("/");
    },
    onError: () => {
      toast.error(t("wrong_logout"));
    },
  });

  return mutation;
};

export default useLogout;
