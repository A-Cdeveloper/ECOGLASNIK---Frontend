import useMeasureListRenderSpeed from "../../hooks/useMeassureListRenderSpeed";
import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import NoResourceFound from "../../ui/NoResourceFound";
import ProblemItem from "./ProblemItem";
import { useProblems } from "./hooks/useProblems";
import useUserProblems from "./hooks/useUserProblems";
import { Virtuoso } from "react-virtuoso";

const ListProblems = ({ userId }: { userId?: number }) => {
  const { isLoading, error } = useProblems();

  const { userProblems, numberOfProblems } = useUserProblems({
    userId,
  });

  const renderTime = useMeasureListRenderSpeed(userProblems!);

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
        {numberOfProblems === 1 ? "1 problem" : `${numberOfProblems} problema`}

        {renderTime !== null && (
          <div className="mt-4 text-center text-winter-100">
            Render Time: {renderTime.toFixed(2)} ms
          </div>
        )}
      </div>
      {/* <div className="w-full flex flex-wrap overflow-auto overflow-x-hidden">
        {userProblems?.map((problem) => (
          <ProblemItem key={problem.id} problem={problem} />
        ))}
      </div> */}
      <Virtuoso
        className="!w-full !h-[65.1vh] !overflow-x-hidden"
        data={userProblems} // Pass the array of problems
        itemContent={(_, problem) => <ProblemItem problem={problem} />}
      />
    </>
  );
};

export default ListProblems;
