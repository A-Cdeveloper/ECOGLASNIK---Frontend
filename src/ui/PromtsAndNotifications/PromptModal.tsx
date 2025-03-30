import { createPortal } from "react-dom";

import ReactRouterPrompt from "react-router-prompt";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";
import { TranslationContext } from "../../context/translationContext";
import { use } from "react";

type PromptProps = {
  isActive: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const PromptModal = ({ formStatus }: { formStatus: boolean }) => {
  const { t } = use(TranslationContext);
  if (!formStatus) return null;
  return createPortal(
    <ReactRouterPrompt when={formStatus}>
      {({ isActive, onConfirm, onCancel }: PromptProps) =>
        isActive && (
          <PromptLayout>
            <PromptLayout.Header title={t("prompt.prompt_leave_question")} />
            <PromptLayout.IntroText intro={t("prompt.prompt_leave_intro")} />
            <PromptLayout.Buttons>
              <Button variation="success" size="small" onClick={onCancel}>
                {t("prompt.continue")}
              </Button>
              <Button variation="danger" size="small" onClick={onConfirm}>
                {t("prompt.cancel")}
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
