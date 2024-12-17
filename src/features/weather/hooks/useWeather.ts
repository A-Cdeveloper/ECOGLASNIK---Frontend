import { useQuery } from "@tanstack/react-query";
import { Position, SettingsType, WeatherApiResponse } from "../../../types";
import { fetchWeather } from "../api/fetchWeather";
import { useQueryClient } from "@tanstack/react-query";

export const useWeather = () => {
  const queryClient = useQueryClient();
  const cachedSettings = queryClient.getQueryData<SettingsType>(["settings"]);

  const defaultPosition = cachedSettings?.data.defaultPosition as Position;
  const { data, isLoading, error } = useQuery<WeatherApiResponse>({
    queryKey: ["weather", defaultPosition?.lat, defaultPosition?.lng],
    queryFn: () => fetchWeather(defaultPosition?.lat, defaultPosition?.lng),
  });

  return {
    data,
    isLoading,
    error,
  };
};
