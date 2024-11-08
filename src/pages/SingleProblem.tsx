import { useParams } from "react-router-dom";
import ProblemDeails from "../features/problems/ProblemDeails";
import BackButton from "../ui/Buttons/BackButton";

const SingleProblem = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      <BackButton />
      <ProblemDeails problemId={id} />
    </>
  );
};

export default SingleProblem;
