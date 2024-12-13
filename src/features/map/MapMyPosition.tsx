import { useLocation, useNavigate } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../../ui/Buttons/Button";
import { outOfMapRange } from "../../utils/helpers";
import { useMap } from "react-leaflet";

const MapMyPosition = ({
  setIsOutOfRange,
}: {
  setIsOutOfRange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { position, setPosition } = useGeolocation();
  const location = useLocation();
  const navigate = useNavigate();
  const map = useMap();

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
        map.setView(position, 17, { animate: true });
        if (outOfMapRange(position)) return setIsOutOfRange(true);
        navigate(`?lat=${position.lat}&lng=${position.lng}`);
      }}
    >
      Moja lokacija
    </Button>
  );
};

export default MapMyPosition;
