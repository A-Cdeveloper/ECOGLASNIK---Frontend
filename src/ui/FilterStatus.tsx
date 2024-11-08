import { useSearchParams } from "react-router-dom";

const FilterStatusButton = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: "true" | "false" | "all";
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = new URLSearchParams(window.location.search);

  const initialClass =
    !searchParams.get("solved") && value === "all" ? "bg-secondary" : "";
  const activeClass =
    searchParams.get("solved") && searchParams.get("solved") === value
      ? "bg-secondary"
      : "";

  return (
    <span
      className={`px-3 py-1 cursor-pointer inline-block text-sm hover:bg-secondary ${activeClass} ${initialClass}`}
      onClick={() => {
        currentParams.set("solved", value as string);
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
      <div className="flex justify-between items-center border-b-1 border-t-1 border-secondary/20 my-2">
        <p>Filtiraj po statusu:</p>
        <div>
          <FilterStatusButton value="all">SVE</FilterStatusButton>
          <FilterStatusButton value="false">AKTIVNO</FilterStatusButton>

          <FilterStatusButton value="true">REŠENO</FilterStatusButton>
        </div>
      </div>
    </>
  );
};

export default FilterStatus;
