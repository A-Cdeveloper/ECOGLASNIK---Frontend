import { HiMiniEnvelope } from "react-icons/hi2";
import { ProblemOfficialEmail, ProblemStatus } from "../types";

const StatusBadge = ({
  status,
  className,
  officialEmail,
}: {
  status: ProblemStatus;
  className?: string;
  officialEmail: ProblemOfficialEmail;
}) => {
  return (
    <span
      className={`${
        status === "DONE" ? "bg-success-500" : "bg-red-500"
      } ${className} min-w-[65px] pt-[2px] pb-[1px] px-[6px] font-bold text-[11px] text-center flex items-center gap-1`}
    >
      {status === "DONE" ? "REŠENO" : "AKTIVNO"}
      {officialEmail === "SENT" && (
        <span className="text-winter-100/60 text-[12px] -mt-[1px]">
          <HiMiniEnvelope />
        </span>
      )}
    </span>
  );
};

export default StatusBadge;
