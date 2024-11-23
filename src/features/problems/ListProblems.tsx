import { useMemo } from "react";
import Loader from "../../ui/Loader";
import NoResourceFound from "../../ui/NoResourceFound";
import ProblemItem from "./ProblemItem";
import { useProblems } from "./hooks/useProblems";
import Error from "../../ui/Error";

const ListProblems = ({ userId }: { userId?: number }) => {
  const {
    isLoading,
    problems,
    error,
    numberOfResults: numberofProblems,
  } = useProblems();

  const userProblems = useMemo(() => {
    if (userId) {
      return problems?.filter((problem) => problem.uid === userId);
    }
    return problems;
  }, [problems, userId]);

  if (isLoading) {
    return <Loader />;
  }

  if (userProblems?.length === 0) {
    return <NoResourceFound resources="problem" />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <div className="my-2 text-[13px] text-end">
        {numberofProblems === 1 ? "1 problem" : `${numberofProblems} problema`}
      </div>
      <div className="w-full flex flex-wrap overflow-auto overflow-x-hidden">
        {userProblems?.map((problem) => (
          <ProblemItem key={problem.id} problem={problem} />
        ))}
      </div>
    </>
  );
};

export default ListProblems;
