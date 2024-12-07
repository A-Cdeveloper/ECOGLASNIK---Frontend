import { useQuery } from "@tanstack/react-query";
import { DEFAULT_CENTER } from "../../../constants";
import { fetchWeather } from "../api/fetchWeather";
import { WeatherApiResponse } from "../../../types";

export const useWeather = () => {
  const { lat, lng } = DEFAULT_CENTER;

  const { data, isLoading, error } = useQuery<WeatherApiResponse>({
    queryKey: ["weather", lat, lng],
    queryFn: () => fetchWeather(lat, lng),
  });

  return {
    data,
    isLoading,
    error,
  };
};
