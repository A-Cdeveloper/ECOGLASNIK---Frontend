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
      ? "bg-secondary"
      : "";

  return (
    <span
      className={`px-3 py-1 cursor-pointer inline-block text-sm hover:bg-secondary ${activeClass} ${initialClass}`}
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
      <div className="flex justify-between items-center border-b-1 border-t-1 border-secondary/20 my-2">
        <p>Filtiraj po statusu:</p>
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
