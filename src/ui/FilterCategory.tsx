import { useSearchParams } from "react-router-dom";
import { useCategories } from "../features/problems/hooks/useCategories";

const FilterCategory = () => {
  const [, setSearchParams] = useSearchParams();
  const { categories } = useCategories();
  const currentParams = new URLSearchParams(window.location.search);

  return (
    <>
      <select
        className="w-1/2 self-center"
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
          setSearchParams(currentParams);
        }}
      >
        <option value="">Sve kategorije</option>
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
