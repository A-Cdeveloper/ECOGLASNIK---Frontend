import { use, useState } from "react";
import { WeatherApiResponse } from "../../types";
import Error from "../../ui/Error";
import MiniSpinner from "../../ui/MiniSpinner";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import { useWeather } from "./hooks/useWeather";
import WToogleButton from "./WToogleButton";
import { TranslationContext } from "../../context/translationContext";

const Weather = () => {
  const { data, isLoading, error } = useWeather();
  const [toogleWeather, setToggleWeather] = useState(false);
  const { t } = use(TranslationContext);

  if (isLoading) return <MiniSpinner />;
  if (error) return <Error message="Došlo je do greške" />;

  const { current, forecast } = data as Omit<WeatherApiResponse, "location">;

  return (
    <div className="w-full h-auto absolute left-0 bottom-0 px-0 z-[99999] bg-primary-500">
      <WToogleButton onToogleWeater={() => setToggleWeather(!toogleWeather)}>
        {t("weather.title")} {toogleWeather ? "▼" : "▲"}
      </WToogleButton>

      {toogleWeather && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
          <CurrentWeather todayWeather={current} area={""} />
          <ForecastWeather forecastWeather={forecast} />
        </div>
      )}
    </div>
  );
};

export default Weather;
