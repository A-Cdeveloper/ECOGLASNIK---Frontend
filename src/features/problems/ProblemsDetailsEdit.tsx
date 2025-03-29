import { useNavigate } from "react-router-dom";
import { Problem } from "../../types";
import Button from "../../ui/Buttons/Button";
import useDeleteProblem from "./hooks/useDeleteProblem";
import useAddEditProblem from "./hooks/useAddEditProblem";
import { getErrorMessage } from "../../utils/helpers";
import { use, useState } from "react";
import PromptDeleteProblem from "../../ui/PromtsAndNotifications/PromptDeleteProblem";
import { TranslationContext } from "../../context/translationContext";

const ProblemsDetailsEdit = ({ problem }: { problem: Problem }) => {
  const navigate = useNavigate();
  const {
    status: updateProblemStatus,
    mutate: updateProblemMutation,
    error: updateProblemError,
  } = useAddEditProblem("edit");
  const { mutate: deleteProblemMutation, status: deleteProblemLaoding } =
    useDeleteProblem();

  const [isShowWarrning, setIsShowWarrning] = useState(false);

  const isLoadingChangeStatus = updateProblemStatus === "pending";
  const isLoadingDeleteProblem = deleteProblemLaoding === "pending";

  const { t } = use(TranslationContext);

  return (
    <>
      {isShowWarrning && (
        <PromptDeleteProblem
          status={isShowWarrning}
          onCancel={() => setIsShowWarrning(false)}
          onConfirm={() =>
            deleteProblemMutation(problem!.id, {
              onSuccess: () => {
                navigate(`/problems/user/${problem?.uid}`);
              },
            })
          }
        />
      )}

      <div className="flex flex-col items-center gap-4 mt-4 border-t-1 border-secondary-500/30 pt-3">
        {updateProblemError && (
          <p className="text-rose-400 mt-0 whitespace-pre-wrap">
            {getErrorMessage(updateProblemError.message)}
          </p>
        )}

        <div className="w-full flex flex-col space-y-2 sm:flex-row sm:justify-center sm:gap-4 sm:space-y-0">
          <Button
            variation="warning"
            size="small"
            onClick={() => {
              navigate(
                `/problems/edit/${problem?.id}/?lat=${problem?.position.lat}&lng=${problem?.position.lng}`
              );
            }}
          >
            {t("problems.edit.edit")}
          </Button>
          <Button
            variation="info"
            size="small"
            onClick={() => {
              updateProblemMutation({
                ...problem!,
                updatedAt: new Date(),
                status: "DONE",
              });
            }}
          >
            {isLoadingChangeStatus
              ? t("problems.edit.edit_loading")
              : t("problems.edit.edit_success")}
          </Button>
          <Button
            variation="danger"
            size="small"
            onClick={() => setIsShowWarrning(true)}
          >
            {isLoadingDeleteProblem
              ? t("problems.edit.delete_loading")
              : t("problems.edit.delete_success")}
          </Button>{" "}
        </div>
      </div>
    </>
  );
};

export default ProblemsDetailsEdit;
