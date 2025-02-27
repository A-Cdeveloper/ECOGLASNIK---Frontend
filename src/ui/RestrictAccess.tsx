import { use } from "react";
import { TranslationContext } from "../context/translationContext";

const RestrictAccess = () => {
  const { t } = use(TranslationContext);
  return (
    <div className="w-full h-[100px] lg:h-[500px] flex flex-col items-center justify-center">
      <span className="text-center font-regular text-[20px] block w-full mb-3">
        {t("restrictAccess")}
      </span>
    </div>
  );
};

export default RestrictAccess;
