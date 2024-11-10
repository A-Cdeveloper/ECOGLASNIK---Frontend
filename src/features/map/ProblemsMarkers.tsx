import { useState } from "react";
import { Problems } from "../../types";
import CustumMarker from "./CustumMarker";

const ProblemsMarkers = ({
  problems,
  problemId,
  problemStatus,
  mapLat,
  mapLng,
}: {
  problems: Problems;
  problemId?: string;
  problemStatus?: string;
  mapLat?: number;
  mapLng?: number;
}) => {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  if (mapLat && mapLng) {
    return (
      <CustumMarker
        problemId={problemId}
        status={problemStatus ? problemStatus : "active"}
        activeMarker={true}
        lat={mapLat}
        lng={mapLng}
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
            hoveredMarker={hoveredMarker}
            setHoveredMarker={setHoveredMarker}
          />
        );
      })}
    </>
  );
};

export default ProblemsMarkers;
