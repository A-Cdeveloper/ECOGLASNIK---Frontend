import { use } from "react";
import BackButton from "../ui/Buttons/BackButton";
import Headline from "../ui/Headline";
import TextBlock from "../ui/TextBlock";
import { TranslationContext } from "../context/translationContext";

const ContactPage = () => {
  const { t } = use(TranslationContext);
  return (
    <>
      <BackButton />

      <Headline level={2} className="font-[600]">
        {t("app.title")}
      </Headline>

      <TextBlock>
        {t("kontakt.title")}
        <br />
        <a href="mailto:kontakt@ecoglasnik.org">kontakt@ecoglasnik.org</a>
      </TextBlock>

      <TextBlock>
        {t("kontakt.questions")} <br />
        <a href="mailto:support@ecoglasnik.org">support@ecoglasnik.org</a>
      </TextBlock>

      <TextBlock>
        E-SEO TEAM
        <br />
        <strong>{t("kontakt.tax_number")} </strong> 107319556
        <br />
        <strong>{t("kontakt.reg_number")} </strong> 62659459
        <br />
        <strong>{t("kontakt.address")}</strong>
      </TextBlock>
    </>
  );
};

export default ContactPage;
