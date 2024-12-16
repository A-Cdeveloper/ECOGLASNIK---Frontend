import FilterStatusButton from "./FilterStatusButton";

const FilterStatus = () => {
  return (
    <>
      <div className="flex justify-start items-center  w-full sm:w-1/2">
        <>
          <FilterStatusButton value="all">SVE</FilterStatusButton>
          <FilterStatusButton value="active">AKTIVNO</FilterStatusButton>
          <FilterStatusButton value="done">REŠENO</FilterStatusButton>
        </>
      </div>
    </>
  );
};

export default FilterStatus;
