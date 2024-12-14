import { useState } from "react";
import { WeatherApiResponse } from "../../types";
import Error from "../../ui/Error";
import MiniSpinner from "../../ui/MiniSpinner";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import { useWeather } from "./hooks/useWeather";
import WToogleButton from "./WToogleButton";

const Weather = () => {
  const { data, isLoading, error } = useWeather();
  const [toogleWeather, setToggleWeather] = useState(true);

  if (isLoading) return <MiniSpinner />;
  if (error) return <Error message="Došlo je do greške" />;

  const { current, forecast } = data as Omit<WeatherApiResponse, "location">;

  return (
    <div className="w-full h-auto fixed left-0 bottom-[0px] lg:bottom-[0px] pb-2 px-0 z-[99999] bg-primary-500">
      <WToogleButton onToogleWeater={() => setToggleWeather(!toogleWeather)}>
        Vremenska prognoza {toogleWeather ? "▼" : "▲"}
      </WToogleButton>

      {toogleWeather && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 items-center pt-[9px] 2xl:pt-[12px]">
          <CurrentWeather todayWeather={current} />
          <ForecastWeather forecastWeather={forecast} />
        </div>
      )}
    </div>
  );
};

export default Weather;
