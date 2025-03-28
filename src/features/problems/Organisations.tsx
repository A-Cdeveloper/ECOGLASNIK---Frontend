import { use } from "react";
import { TranslationContext } from "../../context/translationContext";
import { Organisation } from "../../types";

const Organisations = ({
  organisations,
}: {
  organisations: Organisation[];
}) => {
  const { t } = use(TranslationContext);
  return (
    <div className="space-y-0">
      <div className="tablecaption">{t("problems.organisation")}</div>
      {organisations.map((org) => (
        <div key={org.oid} className="tablecaption">
          <span>{org.organisation_name}</span>
        </div>
      ))}
    </div>
  );
};

export default Organisations;
