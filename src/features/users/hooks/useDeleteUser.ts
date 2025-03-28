import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { use } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { User } from "../../../types";
import { deleteUserApi } from "../api/users";
import { TranslationContext } from "../../../context/translationContext";

const useDeleteUser = (): UseMutationResult<User, Error, number> => {
  const navigate = useNavigate();
  const { removeSessionStorageData } = use(AuthContext);
  const { t } = use(TranslationContext);

  const mutation = useMutation<User, Error, number>({
    mutationFn: deleteUserApi, // This is the function to delete the problem
    onSuccess: () => {
      toast.success(t("users.account_deleted"));
      removeSessionStorageData();
      navigate("/"); // Navigate to home page after deletion
    },
    onError: (err: Error) => {
      toast.error(t("users.account_delete_error") + err.message);
    },
  });

  return mutation;
};

export default useDeleteUser;
