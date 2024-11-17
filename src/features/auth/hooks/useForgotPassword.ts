import { useMutation } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { forgotPasswordApi } from "../api/authentication";

const useForgotPassword = () => {
  const { status, mutate: forgotPassword } = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => toast.error(err.message),
  });

  return { status, forgotPassword };
};

export default useForgotPassword;
