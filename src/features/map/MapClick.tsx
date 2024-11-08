import { useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const MapClick = () => {
  const navigate = useNavigate();

  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;

    if (!lat || !lng) return;

    navigate(`problems/add?lat=${lat}&lng=${lng}`);
  });

  return null;
};

export default MapClick;
