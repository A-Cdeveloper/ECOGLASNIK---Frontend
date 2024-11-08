import { Marker, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";

import CustumMarkerIcon from "./CustumMarkerIcon";

type MarkerType = {
  problemId?: string;
  solved: boolean;
  active?: boolean;
  lat: number;
  lng: number;
  hoveredMarker?: string | null;
  setHoveredMarker?: React.Dispatch<React.SetStateAction<string | null>>;
};

const CustumMarker = ({
  problemId,
  solved,
  active,
  lat,
  lng,
  hoveredMarker,
  setHoveredMarker = () => {},
}: MarkerType) => {
  const navigate = useNavigate();

  const map = useMap();
  return (
    <Marker
      position={[lat, lng]}
      icon={CustumMarkerIcon(solved, active)}
      draggable={true}
      opacity={
        hoveredMarker === null || hoveredMarker === problemId || active
          ? 1
          : 0.5
      }
      eventHandlers={{
        click: () => {
          if (active) return;
          map.setView({ lat, lng }, 15, { animate: true });
          navigate(`problems/${problemId}/?lat=${lat}&lng=${lng}`);
        },
        mouseover: () => setHoveredMarker(problemId as string),
        mouseout: () => setHoveredMarker(null),
      }}
    />
  );
};

export default CustumMarker;
