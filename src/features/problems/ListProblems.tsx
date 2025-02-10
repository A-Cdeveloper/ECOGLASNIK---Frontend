import { Virtuoso } from "react-virtuoso";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import NoResourceFound from "../../ui/NoResourceFound";
import ProblemItem from "./ProblemItem";
import { useProblems } from "./hooks/useProblems";
import useUserProblems from "./hooks/useUserProblems";

const ListProblems = ({ userId }: { userId?: number }) => {
  const { isLoading, error } = useProblems();

  const { userProblems, numberOfProblems } = useUserProblems({
    userId,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (numberOfProblems === 0) {
    return <NoResourceFound resources="problem" />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  const unit = userId ? "prijava" : "problema";

  return (
    <>
      <div className="my-2 text-[13px] text-end text-winter-100/80">
        {numberOfProblems === 1 ? `1 ${unit}` : `${numberOfProblems} ${unit}`}
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
