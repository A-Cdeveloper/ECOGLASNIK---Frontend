import { Link } from "react-router-dom";
import { useProblemCategory } from "./hooks/useProblemCategory";
import Organisations from "./Organisations";

const ProblemCategory = ({ problemId }: { problemId: number }) => {
  const { isLoading: isLoadingCategory, category } =
    useProblemCategory(problemId);

  return (
    <>
      <div className="tablecaption">Kategorija:</div>
      <Link
        to={`/?cat_id=${category?.cat_id}`}
        className="relative after:content-['\2197'] after:ms-1 after:text-[14px] after:font-bold hover:text-yellow"
      >
        {isLoadingCategory ? "Loading..." : category?.cat_name}
      </Link>
      {category?.organisations && category?.organisations.length !== 0 && (
        <div className="col-span-2">
          <Organisations organisations={category?.organisations} />
        </div>
      )}
    </>
  );
};

export default ProblemCategory;
