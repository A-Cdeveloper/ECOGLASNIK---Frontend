import { Link } from "react-router-dom";
import { useProblemCategory } from "./hooks/useProblemCategory";
import Organisations from "./Organisations";
import { TranslationContext } from "../../context/translationContext";
import { use } from "react";

const ProblemCategory = ({ problemId }: { problemId: number }) => {
  const { isLoading: isLoadingCategory, category } =
    useProblemCategory(problemId);
  const { t } = use(TranslationContext);
  return (
    <>
      <div className="tablecaption">{t("problems.category")}</div>
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
