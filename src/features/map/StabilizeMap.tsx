import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { INITIAL_ZOOM, DEFAULT_POSITION } from "../../constants";

const StabilizeMap = () => {
  const map = useMap();
  const location = useLocation();

  useEffect(() => {
    map.setView(DEFAULT_POSITION, INITIAL_ZOOM, { animate: true });
  }, [location.pathname, map]);

  return null;
};

export default StabilizeMap;
