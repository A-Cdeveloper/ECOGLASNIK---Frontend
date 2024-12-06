import { useMapEvent } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import { outOfMapRange } from "../../utils/helpers";
const MapClick = ({
  onClickOutRange,
}: {
  onClickOutRange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;

    if (!lat || !lng || location.pathname !== "/problems/add") return;

    if (outOfMapRange({ lat, lng })) {
      onClickOutRange(true);
      return;
    }

    navigate(`problems/add?lat=${lat}&lng=${lng}`);
  });

  return null;
};

export default MapClick;
