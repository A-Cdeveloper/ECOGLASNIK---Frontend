import L from "leaflet";

import solvedIcon from "../../assets/location-solved.svg";
import unsolvedIcon from "../../assets/location-unsolved.svg";

const CustumMarkerIcon = (status: string, activeMarker: boolean = false) => {
  const customIcon = new L.Icon({
    iconUrl: status === "done" ? solvedIcon : unsolvedIcon,
    iconSize: activeMarker ? [30, 30] : [30, 30],
    iconAnchor: activeMarker ? [15, 15] : [15, 15],
  });

  return customIcon;
};

export default CustumMarkerIcon;
