import { createPortal } from "react-dom";

import ReactRouterPrompt from "react-router-prompt";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";

const PromptModal = ({ formStatus }: { formStatus: boolean }) => {
  if (!formStatus) return null;
  return createPortal(
    <ReactRouterPrompt when={formStatus}>
      {({ isActive, onConfirm, onCancel }) =>
        isActive && (
          <PromptLayout>
            <PromptLayout.Header title="Da li zaista želite da odustanete?" />
            <PromptLayout.IntroText intro="Promene neće biti sačuvane!!!" />
            <PromptLayout.Buttons>
              <Button variation="success" size="small" onClick={onCancel}>
                Nastavi
              </Button>
              <Button variation="danger" size="small" onClick={onConfirm}>
                Izađi
              </Button>
            </PromptLayout.Buttons>
          </PromptLayout>
        )
      }
    </ReactRouterPrompt>,
    document.body
  );
};

export default PromptModal;
