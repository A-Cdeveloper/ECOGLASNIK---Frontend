import { createPortal } from "react-dom";
import Button from "../Buttons/Button";
import PromptLayout from "./PromptLayout";
import { useSettings } from "../../features/settings/hooks/useSettings";
import { calculateDistanceFromBounds } from "../../utils/helpers";
import { Position } from "../../types";
import { useMemo } from "react";

const PromptModalOutRange = ({
  status,
  onClose,
}: {
  status: boolean;
  onClose: () => void;
}) => {
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
        title={`Lokacija je izvan opsega opštine ${settings?.data.appArea} (+~${distance}km)!`}
      />

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
