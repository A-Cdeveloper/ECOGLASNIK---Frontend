import { use } from "react";
import { TranslationContext } from "../../context/translationContext";
import FilterStatusButton from "./FilterStatusButton";

const FilterStatus = () => {
  const { t } = use(TranslationContext);
  return (
    <>
      <div className="flex justify-start items-center  w-full sm:w-1/2">
        <>
          <FilterStatusButton value="all">
            {t("problems.status.ALL")}
          </FilterStatusButton>
          <FilterStatusButton value="ACTIVE">
            {t("problems.status.ACTIVE")}
          </FilterStatusButton>
          <FilterStatusButton value="DONE">
            {t("problems.status.DONE")}
          </FilterStatusButton>
        </>
      </div>
    </>
  );
};

export default FilterStatus;
