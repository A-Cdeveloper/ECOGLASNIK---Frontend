import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { use } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { User } from "../../../types";
import { deleteUserApi } from "../api/users";

const useDeleteUser = (): UseMutationResult<User, Error, number> => {
  const navigate = useNavigate();
  const { removeSessionStorageData } = use(AuthContext);

  const mutation = useMutation<User, Error, number>({
    mutationFn: deleteUserApi, // This is the function to delete the problem
    onSuccess: () => {
      toast.success(`Vaš nalog je uklonjen!`);
      removeSessionStorageData();
      navigate("/"); // Navigate to home page after deletion
    },
    onError: (err: Error) => {
      toast.error("Došlo je do greške pri uklanjanju problema." + err.message);
    },
  });

  return mutation;
};

export default useDeleteUser;
