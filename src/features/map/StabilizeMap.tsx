import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { DEFAULT_POSITION, INITIAL_ZOOM } from "../../constants";
import { useCtxMap } from "../../context/mapContext";

const StabilizeMap = () => {
  const map = useMap();
  const { setZoomLevel, setMapPosition } = useCtxMap();

  useEffect(() => {
    map.setView(DEFAULT_POSITION, INITIAL_ZOOM, { animate: true });
    setZoomLevel(INITIAL_ZOOM);
    setMapPosition(DEFAULT_POSITION);
  }, [map, setMapPosition, setZoomLevel]);

  return null;
};

export default StabilizeMap;
