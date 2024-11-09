import L from "leaflet";
import newIcon from "../../assets/location-active.svg";
import solvedIcon from "../../assets/location-solved.svg";
import unsolvedIcon from "../../assets/location-unsolved.svg";

const CustumMarkerIcon = (status: string, activeMarker: boolean = false) => {
  const customIcon = new L.Icon({
    iconUrl: activeMarker
      ? newIcon
      : status === "done"
      ? solvedIcon
      : unsolvedIcon,
    iconSize: activeMarker ? [60, 60] : [50, 50],
    iconAnchor: [25, 50],
  });

  return customIcon;
};

export default CustumMarkerIcon;
