import useAuth from "../../context/useAuth";
import Form from "./forms/Form";

const ProblemForm = ({ problemId }: { problemId?: string }) => {
  const editMode = problemId ? true : false;
  const { user } = useAuth();

  return (
    <>
      <Form editMode={editMode} problemId={problemId} user={user} />
    </>
  );
};

export default ProblemForm;
