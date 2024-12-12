import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { INITIAL_ZOOM, DEFAULT_POSITION } from "../../constants";

const StabilizeMap = ({
  userPosition,
}: {
  userPosition?: { lat: number; lng: number };
}) => {
  const map = useMap();
  const location = useLocation();

  useEffect(() => {
    const position = userPosition || DEFAULT_POSITION;
    const zoom = userPosition ? INITIAL_ZOOM : INITIAL_ZOOM; // Adjust zoom if userPosition is used

    map.setView(position, zoom, { animate: true });
  }, [location.pathname, map, userPosition]);

  return null;
};

export default StabilizeMap;
