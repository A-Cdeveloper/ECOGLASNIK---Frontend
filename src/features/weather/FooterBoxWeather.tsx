import { WeatherApiResponse } from "../../types";
import Error from "../../ui/Error";
import MiniSpinner from "../../ui/MiniSpinner";
import CurrentWeather from "./CurrentWeather";
import { useWeather } from "./hooks/useWeather";

const FooterBoxWeather = () => {
  const { data, isLoading, error, area } = useWeather();

  if (isLoading) return <MiniSpinner />;
  if (error) return <Error message="Došlo je do greške" />;

  const { current } = data as Omit<WeatherApiResponse, "location">;

  return <CurrentWeather todayWeather={current} area={area} />;
};

export default FooterBoxWeather;
