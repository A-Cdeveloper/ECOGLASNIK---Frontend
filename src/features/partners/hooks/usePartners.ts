import { useQuery } from "@tanstack/react-query";
import { Partner } from "../../../types";
import { getPartnersApi } from "../api/partners";

export const usePartners = () => {
  const {
    data: partners,
    error,
    isLoading,
  } = useQuery<Partner[]>({
    queryKey: ["partners"],
    queryFn: getPartnersApi,
  });

  return { partners, error, isLoading };
};
