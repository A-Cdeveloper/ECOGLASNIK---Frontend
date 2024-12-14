import { useLocation, useNavigate } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../../ui/Buttons/Button";
import { outOfMapRange } from "../../utils/helpers";
import { useMap } from "react-leaflet";
import { useCtxMap } from "../../context/mapContext";

const MapMyPosition = ({
  setIsOutOfRange,
}: {
  setIsOutOfRange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { position, setPosition } = useGeolocation();
  const location = useLocation();
  const navigate = useNavigate();
  const map = useMap();
  const { setZoomLevel, setMapPosition } = useCtxMap();

  if (location.pathname !== "/problems/add") {
    return null;
  }
  return (
    <Button
      variation="info"
      size="large"
      style={{
        position: "absolute",
        top: "25px",
        left: "70px",
        zIndex: 1000000000,
      }}
      onClick={() => {
        setPosition(position);
        const zoom = 17;
        map.setView(position, zoom, { animate: true });
        setZoomLevel(zoom);
        setMapPosition(position);
        if (outOfMapRange(position)) return setIsOutOfRange(true);
        navigate(`?lat=${position.lat}&lng=${position.lng}`);
      }}
    >
      Moja lokacija
    </Button>
  );
};

export default MapMyPosition;
