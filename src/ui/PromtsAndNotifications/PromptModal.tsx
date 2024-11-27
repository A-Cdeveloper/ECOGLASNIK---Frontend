import { createPortal } from "react-dom";

import Headline from "../Headline";
import Button from "../Buttons/Button";
import ReactRouterPrompt from "react-router-prompt";
import PromptLayout from "./PromptLayout";

const PromptModal = ({ formStatus }: { formStatus: boolean }) => {
  if (!formStatus) return null;
  return createPortal(
    <ReactRouterPrompt when={formStatus}>
      {({ isActive, onConfirm, onCancel }) =>
        isActive && (
          <PromptLayout>
            <Headline level={2}>Da li zaista želite da odustanete?</Headline>
            <p>Promene neće biti sačuvane!!!</p>
            <div className="mt-4 space-x-4">
              <Button variation="success" size="small" onClick={onCancel}>
                Nastavi
              </Button>
              <Button variation="danger" size="small" onClick={onConfirm}>
                Izađi
              </Button>
            </div>
          </PromptLayout>
        )
      }
    </ReactRouterPrompt>,
    document.body
  );
};

export default PromptModal;
