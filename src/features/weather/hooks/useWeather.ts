import { useQuery } from "@tanstack/react-query";
import { WeatherApiResponse } from "../../../types";
import { useSettings } from "../../settings/hooks/useSettings";
import { fetchWeather } from "../api/fetchWeather";

export const useWeather = () => {
  const { settings } = useSettings();

  const { data, isLoading, error } = useQuery<WeatherApiResponse>({
    queryKey: [
      "weather",
      settings?.defaultPosition.lat,
      settings?.defaultPosition.lng,
    ],
    queryFn: () =>
      fetchWeather(
        settings!.defaultPosition.lat,
        settings!.defaultPosition.lng
      ),
  });

  return {
    data,
    isLoading,
    error,
  };
};
