import WIcon from "./WIcon";
import WDate from "./WDate";
import { ForecastDayType } from "../../types";

const WDay = ({
  forecastFirst,
  singleDay,
}: {
  forecastFirst: ForecastDayType;
  singleDay: { date: string; day: ForecastDayType };
}) => {
  return (
    <div className="flex gap-1 items-center pl-1 sm:pl-1 xl:pl-2">
      <WIcon
        icon={forecastFirst.condition.icon}
        text={forecastFirst.condition.text}
        className="w-[45px] h-[40px] hidden 3xl:block"
      />
      <div>
        <WDate
          date={singleDay.date}
          mode="short"
          className="mb-1 text-center w-full opacity-65"
        />
        <div className="text-[12px]">
          <p>Max: {singleDay.day.maxtemp_c}°C</p>
          <p>Min: {singleDay.day.mintemp_c}°C</p>
        </div>
      </div>
    </div>
  );
};

export default WDay;
