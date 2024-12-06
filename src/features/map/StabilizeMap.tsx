import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { INITIAL_ZOOM, DEFAULT_POSITION } from "../../constants";

const StabilizeMap = () => {
  const map = useMap();
  const location = useLocation();

  useEffect(() => {
    // Reset the zoom level to the initial value when the route changes
    console.log("stabilize");

    map.setView(DEFAULT_POSITION, INITIAL_ZOOM, { animate: true });
    //map.getCenter();
  }, [location.pathname, map]);

  return null;
};

export default StabilizeMap;
