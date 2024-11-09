import { useState } from "react";
import { Problems } from "../../types";
import CustumMarker from "./CustumMarker";

const ProblemsMarkers = ({
  problems,
  problemId,
  mapLat,
  mapLng,
}: {
  problems: Problems;
  problemId?: string;
  mapLat?: number;
  mapLng?: number;
}) => {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  if (mapLat && mapLng) {
    return (
      <CustumMarker
        problemId={problemId}
        status="active"
        lat={mapLat}
        lng={mapLng}
        activeMarker={true}
        hoveredMarker={hoveredMarker}
        setHoveredMarker={setHoveredMarker}
      />
    );
  }

  return (
    <>
      {problems?.map((problem) => {
        const { lat, lng } = problem.position;

        return (
          <CustumMarker
            key={problem.id}
            problemId={problem.id}
            status={problem.status}
            lat={lat}
            lng={lng}
            activeMarker={
              !!mapLat && !!mapLng && +mapLat === lat && +mapLng === lng
            }
            hoveredMarker={hoveredMarker}
            setHoveredMarker={setHoveredMarker}
          />
        );
      })}
    </>
  );
};

export default ProblemsMarkers;
