import { useQuery } from "@tanstack/react-query";
import { verifyAccountApi } from "../api/authentication";
import { useUrlParams } from "../../../hooks/useUrlParams";

const useVerifyAccount = () => {
  const { token: verificationCode } = useUrlParams();

  const { isLoading, data, error } = useQuery({
    queryFn: () => verifyAccountApi(verificationCode!),
    queryKey: ["verify", verificationCode],
  });

  return { isLoading, data, error };
};

export default useVerifyAccount;
