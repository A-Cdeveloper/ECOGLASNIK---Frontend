import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { User } from "../../../types";
import { verifyAccountApi } from "../api/authentication";

const useVerifyAccount = () => {
  const { userId, verificationCode } = useParams();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery<User>({
    queryFn: () => verifyAccountApi(userId!, verificationCode!),
    queryKey: ["user", userId],
  });

  return { isLoading, user, error };
};

export default useVerifyAccount;
