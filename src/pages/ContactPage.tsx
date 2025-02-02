import BackButton from "../ui/Buttons/BackButton";
import Headline from "../ui/Headline";
import TextBlock from "../ui/TextBlock";

const ContactPage = () => {
  return (
    <>
      <BackButton />

      <Headline level={2} className="font-[600]">
        ECOGLASNIK
      </Headline>

      <TextBlock>
        Kontakt:
        <br />
        <a href="mailto:kontakt@ecoglasnik.org">kontakt@ecoglasnik.org</a>
      </TextBlock>

      <TextBlock>
        Pitanja: <br />
        <a href="mailto:support@ecoglasnik.org">support@ecoglasnik.org</a>
      </TextBlock>

      <TextBlock>
        <p>
          E-SEO TEAM
          <br />
          <strong>PIB: </strong> 107319556
          <br />
          <strong>Matični broj: </strong> 62659459
          <br />
          <strong>16210 Vlasotince, Srbija</strong>
        </p>
      </TextBlock>
    </>
  );
};

export default ContactPage;
