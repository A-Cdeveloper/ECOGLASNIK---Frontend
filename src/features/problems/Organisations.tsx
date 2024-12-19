import { Organisation } from "../../types";

const Organisations = ({
  organisations,
}: {
  organisations: Organisation[];
}) => {
  return (
    <div className="space-y-0">
      <div className="tablecaption">Nadležnost:</div>
      {organisations.map((org) => (
        <div key={org.oid} className="tablecaption">
          <span>{org.organisation_name}</span>
        </div>
      ))}
    </div>
  );
};

export default Organisations;
