import { Suspense, lazy, useState } from "react";
import { Problems } from "../../types";

const CustumMarker = lazy(() => import("./CustumMarker"));

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

  const fallback = <div>Loading marker...</div>;

  if (mapLat && mapLng) {
    return (
      <Suspense fallback={fallback}>
        <CustumMarker
          problemId={problemId}
          status={problemStatus ? problemStatus : "active"}
          activeMarker={true}
          lat={mapLat}
          lng={mapLng}
          hoveredMarker={hoveredMarker}
          setHoveredMarker={setHoveredMarker}
        />
      </Suspense>
    );
  }

  return (
    <>
      {problems?.map((problem) => {
        const { lat, lng } = problem.position;

        return (
          <Suspense key={problem.id} fallback={fallback}>
            <CustumMarker
              problemId={problem.id}
              status={problem.status}
              title={problem.title}
              lat={lat}
              lng={lng}
              hoveredMarker={hoveredMarker}
              setHoveredMarker={setHoveredMarker}
            />
          </Suspense>
        );
      })}
    </>
  );
};

export default ProblemsMarkers;
