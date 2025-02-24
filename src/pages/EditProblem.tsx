import { use } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import FormAddEditProblem from "../features/problems/forms/FormAddEditProblem";
import BackButton from "../ui/Buttons/BackButton";

const EditProblem = () => {
  const params = useParams();
  const problemId = params.id as string;
  const editMode = problemId ? true : false;
  const { user } = use(AuthContext);

  return (
    <>
      <BackButton to={-1} />
      <FormAddEditProblem
        editMode={editMode}
        problemId={problemId}
        user={user}
      />
    </>
  );
};

export default EditProblem;
