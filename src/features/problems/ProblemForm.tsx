import Form from "./forms/Form";

const ProblemForm = ({ problemId }: { problemId?: string }) => {
  const editMode = problemId ? true : false;

  return (
    <>
      <Form editMode={editMode} problemId={problemId} />
    </>
  );
};

export default ProblemForm;
