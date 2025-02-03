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
  const { setZoomLevel, zoomLevel } = useCtxMap();
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
        click: (e) => {
          if (activeMarker) return;
          e.target.closeTooltip();
          setTimeout(() => {
            map.setView({ lat, lng }, zoomLevel, { animate: true });
            navigate(`problems/${problemId}/?lat=${lat}&lng=${lng}`);
          }, 150);
        },
        mouseover: (e) => {
          setHoveredMarker(problemId as string);
          e.target.openTooltip(); // Ensure tooltip opens properly
        },
        mouseout: (e) => {
          setHoveredMarker(null);
          e.target.closeTooltip(); // Ensure tooltip closes properly
        },
        zoomend: () => {
          const currentZoom = map.getZoom();
          setZoomLevel(currentZoom);
        },
      }}
    >
      {title && (
        <Tooltip
          direction="top"
          offset={[0, -10]}
          opacity={1}
          permanent={false}
          interactive={false}
        >
          {title}
        </Tooltip>
      )}
    </Marker>
  );
};

export default CustumMarker;
