import { use } from "react";
import { TranslationContext } from "../../context/translationContext";
import { type User } from "../../types";

const ProblemUser = ({
  user,
}: {
  user: Pick<User, "firstname" | "lastname" | "email">;
}) => {
  const { t } = use(TranslationContext);
  return (
    <>
      <div className="tablecaption">{t("problems.report_by")}:</div>
      <div>{user.firstname + " " + user.lastname}</div>
    </>
  );
};

export default ProblemUser;
