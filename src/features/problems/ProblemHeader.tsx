import { use } from "react";
import { ExtendedProblem } from "../../types";
import StatusBadge from "../../ui/StatusBadge";
import { formattedDate } from "../../utils/helpers";
import ProblemCategory from "./ProblemCategory";
import { TranslationContext } from "../../context/translationContext";

type ProblemHeaderType = Pick<
  ExtendedProblem,
  | "cat_id"
  | "createdAt"
  | "updatedAt"
  | "status"
  | "answer"
  | "uid"
  | "user"
  | "officialEmail"
>;

const ProblemHeader = ({
  cat_id,
  createdAt,
  updatedAt,
  status,
  answer,
  officialEmail,
}: ProblemHeaderType) => {
  const { t } = use(TranslationContext);
  return (
    <>
      <ProblemHeaderLayout className="bg-secondary-500/30">
        <ProblemCategory problemId={cat_id} />
      </ProblemHeaderLayout>

      <ProblemHeaderLayout className="bg-secondary-500/20">
        <div className="tablecaption">{t("problems.details.date_start")}</div>
        <div>{formattedDate(createdAt)}</div>
        {status === "DONE" && (
          <>
            <div className="tablecaption">{t("problems.details.date_end")}</div>
            <div>{formattedDate(updatedAt as Date)}</div>
          </>
        )}
        <div className="tablecaption mt-1">{t("problems.details.status")}</div>
        <div className="mt-1">
          <StatusBadge
            status={status}
            officialEmail={officialEmail}
            className="inline-block w-[80px] pt-[4px]"
          />
        </div>
        {officialEmail === "SENT" && status === "ACTIVE" && (
          <div className="mt-1 col-span-2 text-winter-100/60">
            {t("problems.details.status_official")}
          </div>
        )}
      </ProblemHeaderLayout>
      {answer && (
        <ProblemHeaderLayout className="bg-turquoise-500/80">
          <div className="mt-1 col-span-2 text-winter-100/60">
            {t("problems.details.official_answer")}
            <p className="text-winter-100">{answer}</p>
          </div>
        </ProblemHeaderLayout>
      )}
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
