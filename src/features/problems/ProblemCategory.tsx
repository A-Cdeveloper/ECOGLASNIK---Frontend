import { Link } from "react-router-dom";
import { useProblemCategory } from "./hooks/useProblemCategory";

const ProblemCategory = ({ problemId }: { problemId: number }) => {
  const { isLoading: isLoadingCategory, category } =
    useProblemCategory(problemId);
  return (
    <>
      <div>Kategorija:</div>{" "}
      <Link
        to={`/?cat_id=${category?.cat_id}`}
        className="relative after:content-['\2197'] after:ms-1 after:text-[16px] after:font-bold hover:text-yellow"
      >
        {isLoadingCategory ? "Loading..." : category?.cat_name}
      </Link>
    </>
  );
};

export default ProblemCategory;
