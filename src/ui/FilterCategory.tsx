import { useSearchParams } from "react-router-dom";
import { useCategories } from "../features/problems/hooks/useCategories";

const FilterCategory = () => {
  const [, setSearchParams] = useSearchParams();
  const { categories } = useCategories();
  const currentParams = new URLSearchParams(window.location.search);
  return (
    <>
      <div className="flex justify-between items-center border-b-1 border-t-1 border-secondary/20 my-2 py-2">
        <p>Filtiraj po kategoriji problema:</p>
        <select
          className="w-1/2"
          name="cat_id"
          aria-description="Filter kategoriju problema"
          required
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
        </select>{" "}
      </div>
    </>
  );
};

export default FilterCategory;
