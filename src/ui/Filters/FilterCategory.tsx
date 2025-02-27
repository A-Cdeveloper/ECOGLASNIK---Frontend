import { use } from "react";
import { TranslationContext } from "../../context/translationContext";
import { useCategories } from "../../features/problems/hooks/useCategories";
import { useUrlParams } from "../../hooks/useUrlParams";

const FilterCategory = () => {
  const { categories } = useCategories();
  const { currentParams, setCurrentParams } = useUrlParams();
  const { t } = use(TranslationContext);
  return (
    <>
      <select
        className="w-full sm:w-1/2 self-center"
        name="cat_id"
        aria-description="Filter kategoriju problema"
        required
        defaultValue={currentParams.get("cat_id") || ""}
        onChange={(e) => {
          const selectedCatId = e.target.value;

          if (selectedCatId) {
            currentParams.set("cat_id", selectedCatId);
          } else {
            currentParams.delete("cat_id"); // Remove if no value is selected
          }
          setCurrentParams();
        }}
      >
        <option value="">{t("filter_categories_default")}</option>
        {categories?.map((category) => (
          <option key={category.cat_id} value={category.cat_id}>
            {category.cat_name}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterCategory;
