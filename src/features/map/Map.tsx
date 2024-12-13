import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapClick from "./MapClick";
import ProblemsMarkers from "./ProblemsMarkers";
import StabilizeMap from "./StabilizeMap";

import { useUrlParams } from "../../hooks/useUrlParams";
import { useProblems } from "../problems/hooks/useProblems";

import { DEFAULT_POSITION, INITIAL_ZOOM } from "../../constants";
import { Problem } from "../../types";
import Loader from "../../ui/Loader";

import "leaflet/dist/leaflet.css";
import PromptModalOutRange from "../../ui/PromtsAndNotifications/PromptModalOutRange";
import "../../utils.css";
import MapMyPosition from "./MapMyPosition";
import Button from "../../ui/Buttons/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Map = ({
  problemId,
  userId,
}: {
  problemId?: string;
  userId?: string;
}) => {
  const { mapLat, mapLng } = useUrlParams();
  const { problems, isLoading } = useProblems();

  const navigate = useNavigate();

  const [mapPosition, setMapPosition] = useState(DEFAULT_POSITION);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const location = useLocation();
  const filteredProblems = useMemo(() => {
    if (userId) {
      return problems?.filter((problem) => problem.uid === +userId);
    }
    return problems;
  }, [problems, userId]);

  const problem: Problem | undefined = useMemo(() => {
    return problems?.find((problem) => problem.id === problemId);
  }, [problems, problemId]);

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
      {isOutOfRange && (
        <PromptModalOutRange
          status={isOutOfRange}
          onClose={() => setIsOutOfRange(false)}
        />
      )}

      {location.pathname !== "/problems/add" && (
        <Button
          variation="warning"
          size="extrasmall"
          onClick={() => {
            navigate("/problems/add");
          }}
        >
          Dodaj problem
        </Button>
      )}

      <MapContainer
        center={[mapPosition.lat, mapPosition.lng]}
        zoom={13} // specify initial zoom level
        minZoom={INITIAL_ZOOM}
        // style={{ height: "100vh", width: "100%" }}
        className="h-full w-full"
        dragging={true} // disable dragging
        zoomControl={true} // disable zoom control UI
        scrollWheelZoom={true} // disable scroll zoom
        doubleClickZoom={true} // disable double-click zoom
      >
        <MapMyPosition setIsOutOfRange={setIsOutOfRange} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          className="grayscale-tile"
        />
        <ProblemsMarkers
          problems={filteredProblems ?? []}
          problemId={problemId}
          problemStatus={problem?.status}
          mapLat={mapLat as number}
          mapLng={mapLng as number}
        />
        <MapClick onClickOutRange={setIsOutOfRange} />
        {!mapLat && !mapLng && <StabilizeMap />}
      </MapContainer>
    </>
  );
};

export default Map;
