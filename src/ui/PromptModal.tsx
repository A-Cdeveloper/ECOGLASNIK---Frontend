import { createPortal } from "react-dom";

import Headline from "./Headline";
import Button from "./Buttons/Button";
import ReactRouterPrompt from "react-router-prompt";

const PromptModal = ({ formStatus }: { formStatus: boolean }) => {
  return createPortal(
    <ReactRouterPrompt when={formStatus}>
      {({ isActive, onConfirm, onCancel }) =>
        isActive && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-primary/80 z-[9999999999999999]">
            <div className="bg-primary p-5 rounded-md flex flex-col justify-center items-center">
              <Headline level={2}>Da li zaista želite da odustanete?</Headline>
              <p>Promene neće biti sačuvane!!!</p>
              <div className="mt-4 space-x-4">
                <Button variation="success" size="small" onClick={onCancel}>
                  Nastavi
                </Button>
                <Button variation="danger" size="small" onClick={onConfirm}>
                  Potvrdi
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </ReactRouterPrompt>,
    document.body
  );
};

export default PromptModal;
