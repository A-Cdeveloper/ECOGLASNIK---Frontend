import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { User } from "../../../types";
import { deleteUserApi } from "../api/users";
import useAuth from "../../../context/useAuth";

const useDeleteUser = (): UseMutationResult<User, Error, number> => {
  const navigate = useNavigate();
  const { removeSessionStorageData } = useAuth();

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
