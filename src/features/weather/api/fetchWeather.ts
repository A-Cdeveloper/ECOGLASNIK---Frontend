import { WEATHER_API_KEY, WEATHER_BASE_URL } from "../../../constants";
import {
  WeatherApiResponse,
  WeatherCurrent,
  WeatherForecast,
} from "../../../types";
//import { wait } from "../../../utils/helpers";

export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherApiResponse> => {
  const currentResponse = await fetch(
    `${WEATHER_BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}`
  );
  const currWeather: WeatherCurrent = await currentResponse.json();

  const forecastResponse = await fetch(
    `${WEATHER_BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&days=10`
  );

  const forecastWheater: WeatherForecast = await forecastResponse.json();

  const currentDate = new Date().toISOString().split("T")[0];

  const filteredForecast = {
    ...forecastWheater,
    forecast: {
      forecastday: forecastWheater.forecast.forecastday.filter((day) => {
        return day.date !== currentDate;
      }),
    },
  };

  //await wait(4000);

  return { current: currWeather, forecast: filteredForecast };
};
