import { useSingleProblem } from "./hooks/useSingleProblem";

import Headline from "../../ui/Headline";
import Loader from "../../ui/Loader";
import ProblemHeader from "./ProblemHeader";
import Button from "../../ui/Buttons/Button";
import useUpdateProblemStatus from "./hooks/useUpdateProblemStatus";
import useDeleteProblem from "./hooks/useDeleteProblem";

const ProblemDeails = ({ problemId }: { problemId: string }) => {
  const { isLoading, problem, error } = useSingleProblem(problemId);
  const { mutate: updateStatusMutation, status: changeStatusLaoding } =
    useUpdateProblemStatus();
  const { mutate: deleteProblemMutation, status: deleteProblemLaoding } =
    useDeleteProblem();

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Headline level={2}>{problem?.title}</Headline>
      <h2 className="text-xl font-bold leading-[1.1] mt-3"></h2>
      {problem && <ProblemHeader problem={problem} />}
      <p>{problem?.description}</p>
      <img
        src={problem?.image}
        alt=""
        width={"100%"}
        className="my-4 border-double border-4 border-secondary/50"
      />
      {problem?.status === "active" && (
        <div className="flex flex-col items-center gap-4">
          <Button
            variation="primary"
            size="medium"
            onClick={() => {
              updateStatusMutation({
                ...problem!,
                updatedAt: new Date(),
                status: "done",
              });
            }}
          >
            {changeStatusLaoding === "pending"
              ? "Promena statusa..."
              : "Problem je rešen 📢"}
          </Button>
          <Button
            variation="danger"
            size="small"
            onClick={() => deleteProblemMutation(problem!.id)}
          >
            {deleteProblemLaoding === "pending"
              ? "Brisanje..."
              : "Obriši problem 🎈"}
          </Button>
        </div>
      )}
    </>
  );
};

export default ProblemDeails;
