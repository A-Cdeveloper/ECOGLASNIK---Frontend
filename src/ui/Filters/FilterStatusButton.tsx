import { useUrlParams } from "../../hooks/useUrlParams";

const FilterStatusButton = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: "active" | "done" | "all";
}) => {
  const { status, currentParams, setCurrentParams } = useUrlParams();
  const initialClass =
    !status && value === "all"
      ? "text-winter-100/80 border-1 border-warrning-500"
      : "";
  const activeClass =
    status && status === value ? "border-1 border-warrning-500 text-white" : "";

  return (
    <span
      className={`px-[12px] sm:px-[6px] md:px-[14px] lg:px-[7.5px] xl:px-[9px] pt-[3px] pb-[2px] cursor-pointer inline-block text-sm border-1 border-transparent hover:border-1 hover:border-warrning-500 rounded-md hover:pt-[3px] text-winter-100/80  hover:pb-[2px] ${initialClass} ${activeClass}`}
      onClick={() => {
        currentParams.set("status", value as string);
        setCurrentParams();
      }}
    >
      {children}
    </span>
  );
};

export default FilterStatusButton;
