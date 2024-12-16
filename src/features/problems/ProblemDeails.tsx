import { useSingleProblem } from "./hooks/useSingleProblem";

import useAuth from "../../context/useAuth";
import Error from "../../ui/Error";
import Headline from "../../ui/Headline";
import Loader from "../../ui/Loader";
import ProblemHeader from "./ProblemHeader";
import ProblemsDetailsEdit from "./ProblemsDetailsEdit";
import ProblemImage from "./ProblemImage";

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

      {problem && <ProblemHeader {...problem} />}
      <p className="px-3">{description}</p>

      {problem && problem.image && (
        <ProblemImage
          image={image || ""}
          alt={title || ""}
          className="w-full h-auto overflow-hidden my-4 mx-auto border-double border-4 border-secondary-100"
        />
      )}

      {status === "active" && logedUser?.uid === uid && (
        <ProblemsDetailsEdit problem={problem!} />
      )}
    </>
  );
};

export default ProblemDeails;
