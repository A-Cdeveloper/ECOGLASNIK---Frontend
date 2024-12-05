import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";

const PromptDeleteProblem = ({
  status,
  onCancel,
  onConfirm,
}: {
  status: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  if (!status) return null; // Do not render if status is false

  return createPortal(
    <PromptLayout>
      <PromptLayout.Header title="Problem će biti obrisan" />

      <PromptLayout.IntroText intro="Da li želite da nastavite?" />
      <PromptLayout.Buttons>
        <Button variation="success" size="small" onClick={onCancel}>
          Odustani
        </Button>
        <Button variation="danger" size="small" onClick={onConfirm}>
          Obriši
        </Button>
      </PromptLayout.Buttons>
    </PromptLayout>,
    document.body
  );
};

export default PromptDeleteProblem;
