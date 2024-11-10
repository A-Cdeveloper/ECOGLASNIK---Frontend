import { useParams } from "react-router-dom";
import ProblemForm from "../features/problems/ProblemForm";
import BackButton from "../ui/Buttons/BackButton";

const EditProblem = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      <BackButton to={-1} />
      <ProblemForm problemId={id} />
    </>
  );
};

export default EditProblem;
