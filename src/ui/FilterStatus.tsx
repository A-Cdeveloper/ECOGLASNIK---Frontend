import { useSearchParams } from "react-router-dom";

const FilterStatusButton = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: "active" | "done" | "all";
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = new URLSearchParams(window.location.search);

  const initialClass =
    !searchParams.get("status") && value === "all" ? "bg-secondary" : "";
  const activeClass =
    searchParams.get("status") && searchParams.get("status") === value
      ? "bg-secondary py-[3px]"
      : "";

  return (
    <span
      className={`px-[5px]  md:px-[10px] lg:px-[7.5px] py-[3px] cursor-pointer inline-block text-sm hover:bg-secondary hover:py-[3px] ${activeClass} ${initialClass}`}
      onClick={() => {
        currentParams.set("status", value as string);
        setSearchParams(currentParams);
      }}
    >
      {children}
    </span>
  );
};

const FilterStatus = () => {
  return (
    <>
      <div className="flex justify-between items-center w-1/2">
        <div>
          <FilterStatusButton value="all">SVE</FilterStatusButton>
          <FilterStatusButton value="active">AKTIVNO</FilterStatusButton>

          <FilterStatusButton value="done">REŠENO</FilterStatusButton>
        </div>
      </div>
    </>
  );
};

export default FilterStatus;
