import useAuth from "../../context/useAuth";
import FormAddEditProblem from "./forms/FormAddEditProblem";

const ProblemForm = ({ problemId }: { problemId?: string }) => {
  const editMode = problemId ? true : false;
  const { user } = useAuth();

  return (
    <>
      <FormAddEditProblem
        editMode={editMode}
        problemId={problemId}
        user={user}
      />
    </>
  );
};

export default ProblemForm;
