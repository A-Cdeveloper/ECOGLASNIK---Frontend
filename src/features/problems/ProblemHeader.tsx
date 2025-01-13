import { ExtendedProblem } from "../../types";
import StatusBadge from "../../ui/StatusBadge";
import { formattedDate } from "../../utils/helpers";
import ProblemCategory from "./ProblemCategory";

type ProblemHeaderType = Pick<
  ExtendedProblem,
  "cat_id" | "createdAt" | "updatedAt" | "status" | "uid" | "user"
>;

const ProblemHeader = ({
  cat_id,
  createdAt,
  updatedAt,
  status,
}: ProblemHeaderType) => {
  return (
    <>
      <ProblemHeaderLayout className="bg-secondary-500/30">
        <ProblemCategory problemId={cat_id} />
      </ProblemHeaderLayout>

      <ProblemHeaderLayout className="bg-secondary-500/20">
        <div className="tablecaption">Datum prijave:</div>
        <div>{formattedDate(createdAt)}</div>
        {status === "done" && (
          <>
            <div>Datum rešavanja:</div>
            <div>{formattedDate(updatedAt as Date)}</div>
          </>
        )}
        <div className="tablecaption mt-1">Status:</div>
        <div className="mt-1">
          <StatusBadge status={status} className="inline-block" />
        </div>
      </ProblemHeaderLayout>
    </>
  );
};

export default ProblemHeader;

const ProblemHeaderLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`my-4 py-2 px-3 grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-y-[2px] md:gap-y-[4px] gap-x-8 text-[14px] rounded-md ${className}`}
    >
      {children}
    </div>
  );
};
