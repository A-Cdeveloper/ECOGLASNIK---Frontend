import FilterStatusButton from "./FilterStatusButton";

const FilterStatus = () => {
  return (
    <>
      <div className="flex justify-start items-center  w-full sm:w-1/2">
        <>
          <FilterStatusButton value="all">SVE</FilterStatusButton>
          <FilterStatusButton value="ACTIVE">AKTIVNO</FilterStatusButton>
          <FilterStatusButton value="DONE">REŠENO</FilterStatusButton>
        </>
      </div>
    </>
  );
};

export default FilterStatus;
