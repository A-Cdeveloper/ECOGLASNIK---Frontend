import { useQuery } from "@tanstack/react-query";
import { SettingsType } from "../../../types";
import { getSettingsApi } from "../api/settings";

export const useSettings = () => {
  const { data, error, isLoading } = useQuery<SettingsType>({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return { settings: data, error, isLoading };
};
