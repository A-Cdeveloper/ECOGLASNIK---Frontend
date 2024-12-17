import { Marker, Tooltip, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";

import CustumMarkerIcon from "./CustumMarkerIcon";
import { useCtxMap } from "../../context/mapContext";

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
  const { setZoomLevel } = useCtxMap();
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
          const zoom = 15;
          map.setView({ lat, lng }, zoom, { animate: true });
          setZoomLevel(zoom);
          navigate(`problems/${problemId}/?lat=${lat}&lng=${lng}`);
        },
        mouseover: () => setHoveredMarker(problemId as string),
        mouseout: () => setHoveredMarker(null),
      }}
    >
      {title && (
        <Tooltip
          direction="top"
          offset={[0, -10]}
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
