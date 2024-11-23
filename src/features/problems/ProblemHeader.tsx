import ProblemCategory from "./ProblemCategory";
import { ExtendedProblem } from "../../types";
import User from "../users/User";
import StatusBadge from "../../ui/StatusBadge";
import { formattedDate } from "../../utils/timeFunctions";

type ProblemHeaderType = Pick<
  ExtendedProblem,
  "cat_id" | "createdAt" | "updatedAt" | "status" | "uid" | "user"
>;

const ProblemHeader = ({
  cat_id,
  createdAt,
  updatedAt,
  status,
  user,
}: ProblemHeaderType) => {
  return (
    <div className=" bg-secondary/30 my-4 py-2 px-3 grid grid-cols-[min-content_1fr] gap-y-[7px] gap-x-8 text-[14px] rounded-md">
      <ProblemCategory problemId={cat_id} />
      <div>Prijavljeno:</div>
      <div>{formattedDate(createdAt)}</div>
      <User user={user} />
      {updatedAt && (
        <>
          <div>Rešeno:</div>
          <div>{formattedDate(updatedAt)}</div>
        </>
      )}
      <div>Status:</div>
      <div>
        <StatusBadge status={status} className="inline-block" />
      </div>
    </div>
  );
};

export default ProblemHeader;
