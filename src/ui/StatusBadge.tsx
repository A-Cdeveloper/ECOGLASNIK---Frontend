const StatusBadge = ({
  status,
  className,
}: {
  status: boolean;
  className?: string;
}) => {
  return (
    <span
      className={`${
        status ? "bg-green/80" : "bg-red/80"
      } ${className} px-1 py-[3px] font-bold tracking-wider text-[11px]`}
    >
      {status ? "REŠENO" : "AKTIVNO"}
    </span>
  );
};

export default StatusBadge;
