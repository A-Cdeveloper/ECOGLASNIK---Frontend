import { use } from "react";
import { TranslationContext } from "../../context/translationContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import AuthNotification from "../../ui/AuthNotification";

const AddProblemBanner = () => {
  const { error } = useGeolocation();
  const { t } = use(TranslationContext);

  return (
    <div className="flex flex-col items-center  h-auto space-y-2">
      <div className=" bg-warrning-500/60 px-2 py-2 text-center text-[15px]/[1.25]">
        {t("problems.add_problem_notification_1")}
      </div>
      <div className=" bg-danger-500/60 px-2 py-2 text-[15px]/[1.25]">
        {t("problems.add_problem_notification_2")}
      </div>
      {error && <AuthNotification state="error" message={error} />}
    </div>
  );
};

export default AddProblemBanner;
