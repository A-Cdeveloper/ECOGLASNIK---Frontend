import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { INITIAL_ZOOM } from "../../constants";

const StabilizeMap = () => {
  const map = useMap();
  const location = useLocation();

  useEffect(() => {
    // Reset the zoom level to the initial value when the route changes
    map.setZoom(INITIAL_ZOOM, { animate: true });
  }, [location.pathname, map]);

  return null;
};

export default StabilizeMap;
