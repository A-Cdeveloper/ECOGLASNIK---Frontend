import { createPortal } from "react-dom";
import Headline from "./Headline";
import Button from "./Buttons/Button";

const PromptModalOutRange = ({
  status,
  onClose,
}: {
  status: boolean;
  onClose: () => void;
}) => {
  if (!status) return null; // Do not render if status is false

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-primary/80 z-[9999]">
      <div className="bg-primary p-5 rounded-md flex flex-col justify-center items-center">
        <Headline level={2}>
          Lokacija je izvan opsega opštine Vlasotince (+~10km) !
        </Headline>
        <div className="mt-4 space-x-4">
          <Button variation="danger" size="small" onClick={onClose}>
            Odaberi drugu lokaciju
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PromptModalOutRange;
