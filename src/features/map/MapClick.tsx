import { use } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContext } from "../../context/mapContext";
import { outOfMapRange } from "../../utils/helpers";

const MapClick = ({
  onClickOutRange,
}: {
  onClickOutRange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const map = useMap();
  const { setZoomLevel, mapPosition, zoomLevel, defaultBounds } =
    use(MapContext);

  useMapEvent("zoomend", () => {
    const currentZoom = map.getZoom();
    setZoomLevel(currentZoom);
  });

  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;

    if (!lat || !lng || location.pathname !== "/problems/add") {
      // console.log("Invalid coordinates, ignoring click.");
      return;
    }
    if (outOfMapRange({ lat, lng }, defaultBounds)) {
      map.setView(mapPosition, zoomLevel, { animate: true });
      onClickOutRange(true);
      return;
    }

    map.setView({ lat, lng }, zoomLevel, { animate: true });
    navigate(`problems/add?lat=${lat}&lng=${lng}`);
  });

  return null;
};

export default MapClick;
