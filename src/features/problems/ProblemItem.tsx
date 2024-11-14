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
    <div className="p-2 my-[3px] bg-secondary/20 hover:bg-secondary/85 relative basis-full md:basis-1/2 lg:basis-full self-start">
      <Link to={`/problems/${id}/?lat=${lat}&lng=${lng}`}>
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
            src={`/public/${image}`}
            alt=""
            width={120}
            height={60}
            className="self-start"
          />
        </div>
      </Link>
    </div>
  );
};

export default ProblemItem;
