import { Link } from "react-router-dom";
import { Problem } from "../../types";
import StatusBadge from "../../ui/StatusBadge";
import Headline from "../../ui/Headline";
import { formattedDate } from "../../utils/timeFunctions";

const ProblemItem = ({ problem }: { problem: Problem }) => {
  const {
    id,
    title,
    position: { lat, lng },
    status,
    image,
  } = problem || {};

  return (
    <Link to={`problems/${id}/?lat=${lat}&lng=${lng}`}>
      <div className="border-b-2 border-t border-primary/50 p-2 bg-secondary/20 hover:bg-secondary/85 relative">
        <StatusBadge
          status={problem.status}
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
              {status === "done" &&
                `Rešeno: ${formattedDate(problem?.createdAt)}`}
            </span>
          </div>
          <img
            src={image}
            alt=""
            width={100}
            height={60}
            className="self-start"
          />
        </div>
      </div>
    </Link>
  );
};

export default ProblemItem;
