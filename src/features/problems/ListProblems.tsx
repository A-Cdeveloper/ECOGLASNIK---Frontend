import Error from "../../ui/Error";
import Loader from "../../ui/Loader";
import NoResourceFound from "../../ui/NoResourceFound";
import ProblemItem from "./ProblemItem";
import { useProblems } from "./hooks/useProblems";
import useUserProblems from "./hooks/useUserProblems";

const ListProblems = ({ userId }: { userId?: number }) => {
  const { isLoading, problems, error } = useProblems();

  const { userProblems, numberOfProblems: numberofUserProblems } =
    useUserProblems({
      userId,
      problems,
    });

  if (isLoading) {
    return <Loader />;
  }

  if (numberofUserProblems === 0) {
    return <NoResourceFound resources="problem" />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <div className="my-2 text-[13px] text-end">
        {numberofUserProblems === 1
          ? "1 problem"
          : `${numberofUserProblems} problema`}
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
