import { use } from "react";
import { useNavigate } from "react-router-dom";
import notfound from "../assets/404.png";
import { TranslationContext } from "../context/translationContext";
import Button from "../ui/Buttons/Button";
import Headline from "../ui/Headline";

const PageNotFound = () => {
  const { t } = use(TranslationContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-center items-center w-full h-screen">
      <div className="text-center space-y-4">
        <img src={notfound} alt="not found" className="w-[300px]" />
        <Headline level={2}>{t("page_not_found")}</Headline>
        <Button variation="primary" size="large" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
