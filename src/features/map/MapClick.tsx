import L from "leaflet";
import { useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { DEFAULT_BOUND } from "../../constants";
const MapClick = ({
  onClickOutRange,
}: {
  onClickOutRange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  // Define the bounds
  const bounds = L.latLngBounds(
    L.latLng(DEFAULT_BOUND.southWest),
    L.latLng(DEFAULT_BOUND.northEast)
  );

  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;

    if (!lat || !lng) return;

    // Check if the click is within bounds
    if (!bounds.contains(e.latlng)) {
      onClickOutRange(true);
      console.log("out of range");
      return;
    }

    navigate(`problems/add?lat=${lat}&lng=${lng}`);
  });

  return null;
};

export default MapClick;
