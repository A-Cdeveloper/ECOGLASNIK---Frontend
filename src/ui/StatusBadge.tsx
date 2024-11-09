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
        status === "done" ? "bg-green/80" : "bg-red/80"
      } ${className} px-1 py-[3px] font-bold tracking-wider text-[11px]`}
    >
      {status === "done" ? "REŠENO" : "AKTIVNO"}
    </span>
  );
};

export default StatusBadge;
