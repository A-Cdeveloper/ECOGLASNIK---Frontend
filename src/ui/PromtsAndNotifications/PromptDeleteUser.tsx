import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";

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
  if (!status) return null; // Do not render if status is false

  return createPortal(
    <PromptLayout>
      <PromptLayout.Header
        title={`Broj aktivnih prijava: ${numberOfProblems}`}
      />
      {numberOfProblems !== 0 && (
        <PromptLayout.IntroText intro="Brisanjem naloga obrisaćete TRAJNO i sve Vaše prijave!" />
      )}
      <PromptLayout.IntroText intro="Da li želite da nastavite?" />
      <PromptLayout.Buttons>
        <Button variation="success" size="small" onClick={onCancel}>
          Odustani
        </Button>
        <Button variation="danger" size="small" onClick={onConfirm}>
          Potvrdi
        </Button>
      </PromptLayout.Buttons>
    </PromptLayout>,
    document.body
  );
};

export default PromptDeleteUser;
