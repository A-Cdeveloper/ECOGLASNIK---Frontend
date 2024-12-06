import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";

const PromptAutoLogout = ({
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
      <PromptLayout.Header title="Vaša sesija će uskoro isteći." />

      <PromptLayout.IntroText intro="Da li želite da nastavite?" />
      <PromptLayout.Buttons>
        <Button variation="success" size="small" onClick={onCancel}>
          Logout
        </Button>
        <Button variation="danger" size="small" onClick={onConfirm}>
          Nastavi
        </Button>
      </PromptLayout.Buttons>
    </PromptLayout>,
    document.body
  );
};

export default PromptAutoLogout;
