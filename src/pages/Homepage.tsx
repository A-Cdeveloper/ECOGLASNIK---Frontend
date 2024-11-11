import AddProblemBanner from "../features/problems/AddProblemBanner";
import ListProblems from "../features/problems/ListProblems";
import FilterCategory from "../ui/FilterCategory";
import FilterStatus from "../ui/FilterStatus";

const Homepage = () => {
  return (
    <>
      <AddProblemBanner />
      <div className="flex flex-wrap border-t border-b border-secondary/20 py-2 mt-2">
        <FilterStatus />
        <FilterCategory />
      </div>
      <ListProblems />
    </>
  );
};

export default Homepage;
