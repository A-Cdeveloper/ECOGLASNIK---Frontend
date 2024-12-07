import { WeatherCurrent } from "../../types";
import WIcon from "./WIcon";

const CurrentWeather = ({ todayWeather }: { todayWeather: WeatherCurrent }) => {
  return (
    <div className="w-full px-3 2xl:w-[150px]  grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 items-center xl:grid-cols-3 2xl:grid-cols-1 gap-x-2 border-y-1 2xl:border-y-0 2xl:border-r-1 border-secondary-500/50 py-1">
      <p className="font-bold text-[16px]">Vlasotince</p>
      <div className="flex items-center">
        <WIcon
          icon={todayWeather.current.condition.icon}
          text={todayWeather.current.condition.text}
          className="w-[45px] h-[45px]"
        />

        <span className="uppercase font-bold text-[25px]">
          {todayWeather.current.temp_c}
          <sup>°</sup>C
        </span>
      </div>
      <div className="text-[11px] hidden sm:block">
        <p>
          Vetar: {todayWeather.current.wind_kph} km/h <br />
          Oblačnost:
          {todayWeather.current.humidity}%
        </p>
      </div>{" "}
    </div>
  );
};

export default CurrentWeather;
