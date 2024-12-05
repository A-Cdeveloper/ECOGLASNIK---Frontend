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
        status === "done" ? "bg-success-500" : "bg-red-500"
      } ${className} px-1 py-[3px] font-bold tracking-wider text-[11px]`}
    >
      {status === "done" ? "REŠENO" : "AKTIVNO"}
    </span>
  );
};

export default StatusBadge;
