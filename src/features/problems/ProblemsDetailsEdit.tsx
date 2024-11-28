import { useNavigate } from "react-router-dom";
import { Problem } from "../../types";
import Button from "../../ui/Buttons/Button";
import useDeleteProblem from "./hooks/useDeleteProblem";
import useAddEditProblem from "./hooks/useAddEditProblem";
import { getErrorMessage } from "../../utils/helpers";

const ProblemsDetailsEdit = ({ problem }: { problem: Problem }) => {
  const navigate = useNavigate();
  const {
    status: updateProblemStatus,
    mutate: updateProblemMutation,
    error: updateProblemError,
  } = useAddEditProblem("edit");
  const { mutate: deleteProblemMutation, status: deleteProblemLaoding } =
    useDeleteProblem();

  const isLoadingChangeStatus = updateProblemStatus === "pending";
  const isLoadingDeleteProblem = deleteProblemLaoding === "pending";

  return (
    <div className="flex flex-col items-center gap-4">
      {updateProblemError && (
        <p className="text-rose-400 mt-0 whitespace-pre-wrap">
          {getErrorMessage(updateProblemError.message)}
        </p>
      )}

      <div className="flex items-center gap-4">
        <Button
          variation="warning"
          size="medium"
          onClick={() => {
            navigate(
              `/problems/edit/${problem?.id}/?lat=${problem?.position.lat}&lng=${problem?.position.lng}`
            );
          }}
        >
          Izmeni detalje problema
        </Button>
        <Button
          variation="primary"
          size="medium"
          onClick={() => {
            updateProblemMutation({
              ...problem!,
              updatedAt: new Date(),
              status: "done",
            });
          }}
        >
          {isLoadingChangeStatus ? "Promena statusa..." : "Problem je rešen 📢"}
        </Button>
      </div>

      <Button
        variation="danger"
        size="small"
        onClick={() => deleteProblemMutation(problem!.id)}
      >
        {isLoadingDeleteProblem ? "Brisanje..." : "Obriši problem 🎈"}
      </Button>
    </div>
  );
};

export default ProblemsDetailsEdit;
