import { use } from "react";
import { TranslationContext } from "../../context/translationContext";
import { WeatherCurrent } from "../../types";
import WIcon from "./WIcon";

const CurrentWeather = ({
  todayWeather,
  area,
}: {
  todayWeather: WeatherCurrent;
  area: string;
}) => {
  const { t } = use(TranslationContext);
  return (
    <div className="bg-secondary-500/10 px-2 flex items-center h-[9.5vh]">
      <p className="text-[18px] me-2">{area}</p>
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <WIcon
            icon={todayWeather.current.condition.icon}
            text={todayWeather.current.condition.text}
            className="w-[45px] h-[45px]"
          />

          <span className="uppercase font-bold text-[24px]">
            {Math.round(todayWeather.current.temp_c)}
            <sup>°</sup>C
          </span>
        </div>
        <div className="text-[10px]/[1.3]">
          <p>
            {t("weather.wind")} {todayWeather.current.wind_kph} km/h <br />
            {t("weather.humidity")} {todayWeather.current.humidity}%
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default CurrentWeather;
