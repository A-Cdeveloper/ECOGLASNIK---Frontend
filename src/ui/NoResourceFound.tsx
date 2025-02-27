import { useNavigate } from "react-router-dom";
import Button from "./Buttons/Button";
import { TranslationContext } from "../context/translationContext";
import { use } from "react";

const NoResourceFound = ({ resources }: { resources: string }) => {
  const { t } = use(TranslationContext);
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto lg:h-[500px] flex flex-col items-center justify-start lg:justify-center mt-5 lg:mt-0">
      <span className="text-center font-regular text-[20px] block w-full mb-3">
        {t("not_found")}
      </span>
      <Button
        variation="danger"
        size="large"
        onClick={() => navigate("/problems/add")}
      >
        {t("add_new_resource")} {resources}
      </Button>
    </div>
  );
};

export default NoResourceFound;
