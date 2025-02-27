import { use } from "react";
import { useNavigate } from "react-router-dom";
import { TranslationContext } from "../../context/translationContext";

const BackButton = ({ to = "/" }: { to?: string | number }) => {
  const navigate = useNavigate();
  const { t } = use(TranslationContext);
  return (
    <div className="mb-4 border-b-1 border-secondary-500/30">
      <button
        onClick={() => navigate(to as string)}
        className="border-transparent text-secondary-900 hover:text-secondary-500 -ms-2"
      >
        {" "}
        ← {t("back_button_label")}
      </button>
    </div>
  );
};

export default BackButton;
