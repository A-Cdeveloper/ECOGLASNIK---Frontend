import { Virtuoso } from "react-virtuoso";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import NoResourceFound from "../../ui/NoResourceFound";
import ProblemItem from "./ProblemItem";
import { useProblems } from "./hooks/useProblems";
import useUserProblems from "./hooks/useUserProblems";
import { use, useCallback } from "react";
import { TranslationContext } from "../../context/translationContext";

const ListProblems = ({ userId }: { userId?: number }) => {
  const { isLoading, error } = useProblems();

  const { userProblems, numberOfProblems } = useUserProblems({
    userId,
  });
  const { t } = use(TranslationContext);

  const getUnitLabel = useCallback(
    (count: number) => {
      if (count === 1) return t("problems.item");
      if (count >= 2 && count <= 4) return t("problems.items");
      return t("problems.items");
    },
    [t]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (numberOfProblems === 0) {
    return <NoResourceFound resources="problem" />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <div className="my-2 text-[13px] text-end text-winter-100/80">
        {numberOfProblems && (
          <span className="flex items-center justify-end text-end gap-1">
            <strong>{numberOfProblems}</strong>
            {getUnitLabel(numberOfProblems).toUpperCase()}
          </span>
        )}
      </div>

      <Virtuoso
        className="!w-full md:!w-2/3 lg:!w-full !h-[65vh] !overflow-x-hidden !flex !flex-wrap !mx-0 md:!mx-auto lg:!mx-0 custum-scrollbar !me-0 lg:!me-4"
        data={userProblems} // Pass the array of problems
        itemContent={(_, problem) => <ProblemItem problem={problem} />}
      />
    </>
  );
};

export default ListProblems;
