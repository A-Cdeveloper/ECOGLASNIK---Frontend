import { UseMutationResult, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPasswordApi } from "../api/authentication";

const useResetPassword = (): UseMutationResult<
  { message: string },
  Error,
  { password: string; verificationCode: string }
> => {
  const mutation = useMutation<
    { message: string },
    Error,
    { password: string; verificationCode: string }
  >({
    mutationFn: resetPasswordApi,
    onError: () =>
      toast.error("Došlo je do greške prilikom zahteva za reset lozinke."),
  });

  return mutation;
};

export default useResetPassword;
