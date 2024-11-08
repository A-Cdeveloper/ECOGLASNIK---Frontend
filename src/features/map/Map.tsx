import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapClick from "./MapClick";
import ProblemsMarkers from "./ProblemsMarkers";
import StabilizeMap from "./StabilizeMap";

import { useProblems } from "../problems/hooks/useProblems";
import { useUrlParams } from "../../hooks/useUrlParams";

import "leaflet/dist/leaflet.css";
import "../../utils.css";
import { DEFAULT_POSITION, INITIAL_ZOOM } from "../../constants";
import Loader from "../../ui/Loader";

const Map = ({ problemId }: { problemId: string }) => {
  const { mapLat, mapLng } = useUrlParams();
  const { problems, isLoading } = useProblems();
  const [mapPosition, setMapPosition] = useState(DEFAULT_POSITION);

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition({ lat: mapLat, lng: mapLng });
    }
  }, [mapLat, mapLng]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <MapContainer
        center={[mapPosition.lat, mapPosition.lng]}
        zoom={13} // specify initial zoom level
        minZoom={INITIAL_ZOOM}
        style={{ height: "100vh", width: "100%" }}
        dragging={true} // disable dragging
        zoomControl={true} // disable zoom control UI
        scrollWheelZoom={true} // disable scroll zoom
        doubleClickZoom={true} // disable double-click zoom
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          className="grayscale-tile"
        />

        <ProblemsMarkers
          problems={problems ?? []}
          problemId={problemId}
          mapLat={mapLat as number}
          mapLng={mapLng as number}
        />

        {!mapLat && !mapLng && <MapClick />}
        {!mapLat && !mapLng && <StabilizeMap />}
      </MapContainer>
    </>
  );
};

export default Map;
