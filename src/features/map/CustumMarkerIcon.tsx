import L from "leaflet";

import solvedIcon from "../../assets/location-solved.svg";
import unsolvedIcon from "../../assets/location-unsolved.svg";

const CustumMarkerIcon = (status: string, activeMarker: boolean = false) => {
  const customIcon = new L.Icon({
    iconUrl: status === "done" ? solvedIcon : unsolvedIcon,
    iconSize: activeMarker ? [60, 60] : [50, 50],
    iconAnchor: activeMarker ? [30, 60] : [25, 50],
  });

  return customIcon;
};

export default CustumMarkerIcon;
