import { formattedDate } from "../../utils/helpers";

const WDate = ({
  date,
  mode,
  className,
}: {
  date: string;
  mode?: string;
  className?: string;
}) => {
  return (
    <span className={`text-[12px] font-normal ${className} block`}>
      {formattedDate(new Date(date), mode)}
    </span>
  );
};

export default WDate;
