import { useNavigate } from "react-router-dom";
import { Problem } from "../../types";
import Button from "../../ui/Buttons/Button";
import useDeleteProblem from "./hooks/useDeleteProblem";
import useUpdateProblemStatus from "./hooks/useUpdateProblemStatus";

const ProblemsDetailsEdit = ({ problem }: { problem: Problem }) => {
  const navigate = useNavigate();
  const { mutate: updateStatusMutation, status: changeStatusLaoding } =
    useUpdateProblemStatus();
  const { mutate: deleteProblemMutation, status: deleteProblemLaoding } =
    useDeleteProblem();

  return (
    <div className="flex flex-col items-center gap-4">
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
            updateStatusMutation({
              ...problem!,
              updatedAt: new Date(),
              status: "done",
            });
            navigate("/");
          }}
        >
          {changeStatusLaoding === "pending"
            ? "Promena statusa..."
            : "Problem je rešen 📢"}
        </Button>
      </div>

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
  );
};

export default ProblemsDetailsEdit;
