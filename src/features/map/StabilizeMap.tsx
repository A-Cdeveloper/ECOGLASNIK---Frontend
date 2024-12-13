import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { DEFAULT_POSITION, INITIAL_ZOOM } from "../../constants";

const StabilizeMap = () => {
  const map = useMap();

  useEffect(() => {
    map.setView(DEFAULT_POSITION, INITIAL_ZOOM, { animate: true });
  }, [map]);

  return null;
};

export default StabilizeMap;
