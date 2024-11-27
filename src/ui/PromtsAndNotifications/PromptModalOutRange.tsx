import { createPortal } from "react-dom";
import Headline from "../Headline";
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
      <Headline level={2}>
        Lokacija je izvan opsega opštine Vlasotince (+~10km) !
      </Headline>
      <div className="mt-4 space-x-4">
        <Button variation="danger" size="small" onClick={onClose}>
          Odaberi drugu lokaciju
        </Button>
      </div>
    </PromptLayout>,
    document.body
  );
};

export default PromptModalOutRange;
