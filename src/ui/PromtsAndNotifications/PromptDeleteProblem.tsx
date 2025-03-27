import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";
import { use } from "react";
import { TranslationContext } from "../../context/translationContext";

const PromptDeleteProblem = ({
  status,
  onCancel,
  onConfirm,
}: {
  status: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  const { t } = use(TranslationContext);
  if (!status) return null; // Do not render if status is false

  return createPortal(
    <PromptLayout>
      <PromptLayout.Header title="Problem će biti obrisan" />

      <PromptLayout.IntroText intro="Da li želite da nastavite?" />
      <PromptLayout.Buttons>
        <Button variation="success" size="small" onClick={onCancel}>
          {t("prompt.cancel")}
        </Button>
        <Button variation="danger" size="small" onClick={onConfirm}>
          {t("prompt.delete")}
        </Button>
      </PromptLayout.Buttons>
    </PromptLayout>,
    document.body
  );
};

export default PromptDeleteProblem;
