import { useSingleProblem } from "./hooks/useSingleProblem";

import useAuth from "../../context/useAuth";
import Error from "../../ui/Error";
import Headline from "../../ui/Headline";
import Loader from "../../ui/Loader";
import ProblemHeader from "./ProblemHeader";
import ProblemsDetailsEdit from "./ProblemsDetailsEdit";

const ProblemDeails = ({ problemId }: { problemId: string }) => {
  const { isLoading, problem, error } = useSingleProblem(problemId);
  const { user: logedUser } = useAuth();
  const { uid, title, description, image, status } = problem || {};

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <Headline level={2}>{title}</Headline>
      <h2 className="text-xl font-bold leading-[1.1] mt-3"></h2>
      {problem && <ProblemHeader {...problem} />}
      <p>{description}</p>
      <img
        src={image}
        alt={title}
        width={"100%"}
        className="my-4 border-double border-4 border-secondary/50"
      />
      {status === "active" && logedUser?.uid === uid && (
        <ProblemsDetailsEdit problem={problem!} />
      )}
    </>
  );
};

export default ProblemDeails;
