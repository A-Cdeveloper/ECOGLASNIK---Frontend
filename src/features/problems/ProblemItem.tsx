import { useNavigate } from "react-router-dom";
import { Problem } from "../../types";
import StatusBadge from "../../ui/StatusBadge";
import Headline from "../../ui/Headline";
import { formattedDate } from "../../utils/helpers";
import ProblemImage from "./ProblemImage";
import { useCtxMap } from "../../context/mapContext";

const ProblemItem = ({ problem }: { problem: Problem }) => {
  const {
    id,
    title,
    position: { lat, lng },
    status,
    image,
  } = problem || {};

  const { setZoomLevel, updateMapView } = useCtxMap();

  const navigate = useNavigate();

  return (
    <div className="px-2 py-[10px] my-[3px] bg-secondary-500/20 hover:bg-secondary-500/75 relative w-[98%]">
      <span
        className="cursor-pointer"
        onClick={() => {
          const zoom = 15;
          updateMapView({ lat, lng }, zoom);
          setZoomLevel(zoom);
          navigate(`/problems/${id}/?lat=${lat}&lng=${lng}`);
        }}
      >
        <StatusBadge
          status={problem.status}
          officialEmail={problem.officialEmail}
          className="ms-2 absolute end-[-3px] top-[3px] block"
        />
        <div className="flex justify-between gap-5">
          <div>
            <Headline level={4} className="mb-1">
              {title}
            </Headline>

            <span className="text-[12px] block mt-1 text-white/75">
              Prijavljeno: {formattedDate(problem?.createdAt)}
              <br />
              {status === "DONE" &&
                `Rešeno: ${formattedDate(problem?.createdAt)}`}
            </span>
          </div>

          <ProblemImage
            image={image || ""}
            alt={title || ""}
            className="w-[90px] h-[60px] overflow-hidden self-center border-double border-4 border-secondary-100"
          />
        </div>
      </span>
    </div>
  );
};

export default ProblemItem;
