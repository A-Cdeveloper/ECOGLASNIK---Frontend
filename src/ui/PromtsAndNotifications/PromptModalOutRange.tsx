import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";

const PromptModalOutRange = ({
  status,
  onClose,
}: {
  status: boolean;
  onClose: () => void;
}) => {
  if (!status) return null; // Do not render if status is false

  return createPortal(
    <PromptLayout>
      <PromptLayout.Header title="Lokacija je izvan opsega opštine Vlasotince (+~10km)!" />

      <PromptLayout.Buttons>
        <Button variation="danger" size="small" onClick={onClose}>
          Odaberi drugu lokaciju
        </Button>
      </PromptLayout.Buttons>
    </PromptLayout>,
    document.body
  );
};

export default PromptModalOutRange;
