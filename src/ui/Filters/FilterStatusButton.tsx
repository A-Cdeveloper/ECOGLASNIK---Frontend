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
    !status && value === "all" ? "bg-secondary-500 text-winter-100/80" : "";
  const activeClass =
    status && status === value ? "bg-secondary-500 py-[3px] text-white" : "";

  return (
    <span
      className={`px-[5px]  md:px-[10px] lg:px-[7.5px] xl:px-[9px] py-[3px] cursor-pointer inline-block text-sm hover:bg-secondary-500 rounded-md hover:py-[3px] text-winter-100/80 hover:text-white ${activeClass} ${initialClass}`}
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
