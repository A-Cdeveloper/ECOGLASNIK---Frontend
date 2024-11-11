import { useMemo } from "react";
import Loader from "../../ui/Loader";
import ProblemItem from "./ProblemItem";
import { useProblems } from "./hooks/useProblems";
import NoResourceFound from "../../ui/NoResourceFound";

const ListProblems = () => {
  const { isLoading, problems, error } = useProblems();

  const numberofProblems =
    useMemo(() => problems?.length, [problems]) ?? problems?.length;

  if (isLoading) {
    return <Loader />;
  }

  if (problems?.length === 0) {
    return <NoResourceFound resources="problem" />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <div className="my-2 text-[13px] text-end">
        {numberofProblems === 1 ? "1 problem" : `${numberofProblems} problema`}
      </div>
      <div className="w-full flex flex-wrap overflow-auto overflow-x-hidden">
        {problems?.map((problem) => (
          <ProblemItem key={problem.id} problem={problem} />
        ))}
      </div>
    </>
  );
};

export default ListProblems;
