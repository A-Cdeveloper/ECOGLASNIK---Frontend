import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";
import { useSettings } from "../../features/settings/hooks/useSettings";
import { calculateDistanceFromBounds } from "../../utils/helpers";
import { Position } from "../../types";
import { use, useMemo } from "react";
import { TranslationContext } from "../../context/translationContext";

const PromptModalOutRange = ({
  status,
  onClose,
}: {
  status: boolean;
  onClose: () => void;
}) => {
  const { t } = use(TranslationContext);
  const { settings } = useSettings();
  const distance = useMemo(() => {
    return calculateDistanceFromBounds(
      settings?.data.defaultPosition as Position,
      settings?.data.defaultBound as {
        northEast: { lat: number; lng: number };
        southWest: { lat: number; lng: number };
      }
    );
  }, [settings?.data.defaultPosition, settings?.data.defaultBound]);

  if (!status) return null; // Do not render if status is false

  return createPortal(
    <PromptLayout>
      <PromptLayout.Header
        title={t("prompt.location_outof_range")
          .replace("{appArea}", settings?.data.appArea ?? "")
          .replace("{distance}", distance?.toString() ?? "0")}
      />

      <PromptLayout.Buttons>
        <Button variation="danger" size="small" onClick={onClose}>
          {t("prompt.select_other_location")}
        </Button>
      </PromptLayout.Buttons>
    </PromptLayout>,
    document.body
  );
};

export default PromptModalOutRange;
