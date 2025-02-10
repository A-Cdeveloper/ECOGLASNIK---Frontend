const StatusBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  return (
    <span
      className={`${
        status === "DONE" ? "bg-success-500" : "bg-red-500"
      } ${className} w-[65px] py-[3px] font-bold text-[11px] text-center`}
    >
      {status === "DONE" ? "REŠENO" : "AKTIVNO"}
    </span>
  );
};

export default StatusBadge;
