import ListProblems from "../features/problems/ListProblems";
import FilterCategory from "../ui/Filters/FilterCategory";
import FilterStatus from "../ui/Filters/FilterStatus";

const Homepage = () => {
  return (
    <>
      <div className="flex flex-wrap border-t border-b border-secondary-500/40 py-2 mt-2 space-y-2 sm:space-y-0">
        <FilterStatus />
        <FilterCategory />
      </div>
      <ListProblems />
    </>
  );
};

export default Homepage;
