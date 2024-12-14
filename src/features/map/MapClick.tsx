import { useMap, useMapEvent } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { outOfMapRange } from "../../utils/helpers";
import { useCtxMap } from "../../context/mapContext";
import { DEFAULT_POSITION, INITIAL_ZOOM } from "../../constants";

const MapClick = ({
  onClickOutRange,
}: {
  onClickOutRange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const map = useMap();
  const { setZoomLevel } = useCtxMap();

  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;

    if (!lat || !lng || location.pathname !== "/problems/add") {
      console.log("Invalid coordinates, ignoring click.");
      return;
    }
    if (outOfMapRange({ lat, lng })) {
      setZoomLevel(INITIAL_ZOOM);
      map.setView(DEFAULT_POSITION, INITIAL_ZOOM, { animate: true });
      onClickOutRange(true);
      return;
    }
    const zoom = 16;
    map.setView({ lat, lng }, zoom, { animate: true });
    setZoomLevel(zoom);

    navigate(`problems/add?lat=${lat}&lng=${lng}`);
  });

  return null;
};

export default MapClick;
