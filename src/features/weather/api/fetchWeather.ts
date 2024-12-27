import {
  WeatherApiResponse,
  WeatherCurrent,
  WeatherForecast,
} from "../../../types";
import { weatherClient } from "../../../utils/axios";
import { throwError } from "../../../utils/helpers";
//import { wait } from "../../../utils/helpers";

export const fetchWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherApiResponse> => {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      weatherClient.get<WeatherCurrent>(`/current.json`, {
        params: { q: `${latitude},${longitude}` },
      }),
      weatherClient.get<WeatherForecast>(`/forecast.json`, {
        params: { q: `${latitude},${longitude}`, days: 8 },
      }),
    ]);

    const currentWeather = currentResponse.data;
    const forecastWeather = forecastResponse.data;

    // Filter out the current date from the forecast
    const currentDate = new Date().toISOString().split("T")[0];
    const filteredForecast = {
      ...forecastWeather,
      forecast: {
        forecastday: forecastWeather.forecast.forecastday.filter(
          (day) => day.date !== currentDate
        ),
      },
    };

    return { current: currentWeather, forecast: filteredForecast };
  } catch (error) {
    return await throwError(error);
  }
};
