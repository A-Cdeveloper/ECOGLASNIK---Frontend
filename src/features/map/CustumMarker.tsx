import { Marker, Tooltip, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";

import CustumMarkerIcon from "./CustumMarkerIcon";

type MarkerType = {
  problemId?: string;
  status: string;
  title?: string;
  activeMarker?: boolean;
  lat: number;
  lng: number;
  hoveredMarker?: string | null;
  setHoveredMarker?: React.Dispatch<React.SetStateAction<string | null>>;
};

const CustumMarker = ({
  problemId,
  status,
  title,
  activeMarker,
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
      icon={CustumMarkerIcon(status, activeMarker)}
      draggable={false}
      opacity={
        hoveredMarker === null || hoveredMarker === problemId || activeMarker
          ? 1
          : 0.5
      }
      eventHandlers={{
        click: () => {
          if (activeMarker) return;
          map.setView({ lat, lng }, 15, { animate: true });
          navigate(`problems/${problemId}/?lat=${lat}&lng=${lng}`);
        },
        mouseover: () => setHoveredMarker(problemId as string),
        mouseout: () => setHoveredMarker(null),
      }}
    >
      {title && (
        <Tooltip
          direction="top"
          offset={[0, -30]}
          opacity={1}
          permanent={false}
        >
          {title}
        </Tooltip>
      )}
    </Marker>
  );
};

export default CustumMarker;
