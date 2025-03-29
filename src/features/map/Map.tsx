import { useMemo, useState, useRef, use } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MapClick from "./MapClick";
import ProblemsMarkers from "./ProblemsMarkers";
import StabilizeMap from "./StabilizeMap";

import { useUrlParams } from "../../hooks/useUrlParams";
import { useProblems } from "../problems/hooks/useProblems";

import { Problem } from "../../types";
import Loader from "../../ui/Loader";

import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContext } from "../../context/mapContext";
import Button from "../../ui/Buttons/Button";
import PromptModalOutRange from "../../ui/PromtsAndNotifications/PromptModalOutRange";
import "../../utils.css";
import MapMyPosition from "./MapMyPosition";
import { TranslationContext } from "../../context/translationContext";
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
  const { mapPosition, zoomLevel, setMapInstance } = use(MapContext);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const location = useLocation();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { t } = use(TranslationContext);

  const filteredProblems = useMemo(() => {
    if (userId) {
      return problems?.filter((problem) => problem.uid === +userId);
    }
    return problems;
  }, [problems, userId]);

  const problem: Problem | undefined = useMemo(() => {
    return problems?.find((problem) => problem.id === problemId);
  }, [problems, problemId]);

  if (isLoading) {
    return <Loader />;
  }

  // ✅ Fullscreen toggle function
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

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
          {t("problems.add.headline")}
        </Button>
      )}
      {/* ✅ Wrap the MapContainer inside a div with a ref */}
      <div ref={mapRef} className="relative h-[400px] lg:h-full w-full">
        {/* ✅ Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 bg-white text-primary-900 py-1 px-2 text-[16px] rounded-md shadow-md z-[1000]"
        >
          ⛶
        </button>

        <MapContainer
          center={[mapPosition.lat, mapPosition.lng]}
          zoom={zoomLevel}
          minZoom={zoomLevel}
          className="h-full w-full"
          dragging={true}
          zoomControl={true}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          whenReady={(event) => {
            const map = event.target;
            setMapInstance(map);
          }}
        >
          <MapMyPosition onClickOutRange={setIsOutOfRange} />
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
      </div>
    </>
  );
};

export default Map;
