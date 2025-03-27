import { use } from "react";
import { TranslationContext } from "../context/translationContext";
import BackButton from "../ui/Buttons/BackButton";
import TextBlock from "../ui/TextBlock";

const ImpressumPage = () => {
  const { t } = use(TranslationContext);
  return (
    <>
      <BackButton />

      <TextBlock>
        <strong>{t("app.title")}</strong> {t("impressum.intro_text")}
      </TextBlock>

      <TextBlock caption={t("impressum.disclaimer_headline")}>
        <strong>{t("app.title")}</strong> {t("impressum.disclaimer_text")}
      </TextBlock>

      <TextBlock caption={t("impressum.copyright_headline")}>
        {t("impressum.copyright_text")}
      </TextBlock>

      <TextBlock caption={t("impressum.privacy_headline")}>
        {t("app.title")} {t("impressum.privacy_text")}
      </TextBlock>

      <TextBlock caption={t("impressum.legal_headline")}>
        {t("impressum.legal_text")}
      </TextBlock>
    </>
  );
};

export default ImpressumPage;
