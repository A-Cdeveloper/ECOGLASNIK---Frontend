import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";
import { use } from "react";
import { TranslationContext } from "../../context/translationContext";

const PromptDeleteUser = ({
  status,
  onCancel,
  onConfirm,
  numberOfProblems,
}: {
  status: boolean;
  numberOfProblems: number;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { t } = use(TranslationContext);

  if (!status) return null; // Do not render if status is false

  return createPortal(
    <PromptLayout>
      <PromptLayout.Header
        title={t("prompt.prompt_user_delete_title").replace(
          "{numberOfProblems}",
          numberOfProblems.toString()
        )}
      />
      {numberOfProblems !== 0 && (
        <PromptLayout.IntroText intro={t("prompt.prompt_user_delete_intro")} />
      )}
      <PromptLayout.IntroText intro={t("prompt.prompt_user_delete_question")} />
      <PromptLayout.Buttons>
        <Button variation="success" size="small" onClick={onCancel}>
          {t("prompt.cancel")}
        </Button>
        <Button variation="danger" size="small" onClick={onConfirm}>
          {t("prompt.confirm")}
        </Button>
      </PromptLayout.Buttons>
    </PromptLayout>,
    document.body
  );
};

export default PromptDeleteUser;
