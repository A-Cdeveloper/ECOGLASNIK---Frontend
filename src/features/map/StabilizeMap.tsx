import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useCtxMap } from "../../context/mapContext";
import { SettingsType } from "../../types";

const StabilizeMap = () => {
  const map = useMap();
  const { setZoomLevel, setMapPosition } = useCtxMap();
  const queryClient = useQueryClient();

  const cachedSettings = queryClient.getQueryData<SettingsType>(["settings"]);

  useEffect(() => {
    if (!cachedSettings) return;
    map.setView(
      cachedSettings?.data.defaultPosition,
      cachedSettings?.data.initialZoom,
      {
        animate: true,
      }
    );
    setZoomLevel(cachedSettings?.data.initialZoom);
    setMapPosition(cachedSettings?.data.defaultPosition);
  }, [cachedSettings, map, setMapPosition, setZoomLevel]);

  return null;
};

export default StabilizeMap;
