import AddProblemBanner from "../features/problems/AddProblemBanner";
import ListProblems from "../features/problems/ListProblems";
import FilterCategory from "../ui/FilterCategory";
import FilterStatus from "../ui/FilterStatus";

const Homepage = () => {
  return (
    <>
      <AddProblemBanner />
      <FilterStatus />
      <FilterCategory />
      <ListProblems />
    </>
  );
};

export default Homepage;
