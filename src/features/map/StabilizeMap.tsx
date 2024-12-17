import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useCtxMap } from "../../context/mapContext";
import { useSettings } from "../settings/hooks/useSettings";

const StabilizeMap = () => {
  const map = useMap();
  const { setZoomLevel, setMapPosition } = useCtxMap();

  const { settings, isLoading } = useSettings();

  useEffect(() => {
    if (!settings || isLoading) return;
    map.setView(settings?.defaultPosition, settings?.initialZoom, {
      animate: true,
    });
    setZoomLevel(settings?.initialZoom);
    setMapPosition(settings?.defaultPosition);
  }, [isLoading, map, setMapPosition, setZoomLevel, settings]);

  return null;
};

export default StabilizeMap;
