import L from "leaflet";
import newIcon from "../../assets/location-active.svg";
import solvedIcon from "../../assets/location-solved.svg";
import unsolvedIcon from "../../assets/location-unsolved.svg";

const CustumMarkerIcon = (solved: boolean, active: boolean = false) => {
  const customIcon = new L.Icon({
    iconUrl: active ? newIcon : solved ? solvedIcon : unsolvedIcon,
    iconSize: active ? [60, 60] : [50, 50],
    iconAnchor: [25, 50],
  });

  return customIcon;
};

export default CustumMarkerIcon;
