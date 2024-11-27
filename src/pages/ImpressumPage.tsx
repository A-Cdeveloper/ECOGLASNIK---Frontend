import BackButton from "../ui/Buttons/BackButton";
import TextBlock from "../ui/TextBlock";

const ImpressumPage = () => {
  return (
    <>
      <BackButton />
      <p>
        <strong>Naziv sajta:</strong> CLEANME <br />
        <strong>Vlasnik:</strong> E-SEO TEAM
        <br />
        <strong>PIB: </strong> 107319556
        <br />
        <strong>Matični broj: </strong> 62659459
        <br />
        <strong>16210 Vlasotince, Srbija</strong>
      </p>
      <TextBlock caption="Kontakt:">
        Telefon: <a href="tel:+381637675989">+381 637675989</a> <br />
        Email: <a href="mailto:cleanme@e-seo.info">cleanme@e-seo.info</a>
        <br />
        Web:{" "}
        <a href="https://www.e-seo.info" target="_blank">
          www.e-seo.info
        </a>
      </TextBlock>
      <TextBlock caption="Opis sajta:">
        CLEANME je online platforma koja omogućava građanima da prijave probleme
        u komunalnoj infrastrukturi putem interaktivne mape. Korisnici mogu lako
        i brzo prijaviti komunalne probleme poput oštećenih puteva, prepunih
        kontejnera, kvarova na uličnom osvetljenju i slično. Cilj sajta je da
        unapredi komunikaciju između građana i komunalnih službi, olakšavajući
        brzo rešavanje prijavljenih problema.
      </TextBlock>

      <TextBlock caption="Odricanje od odgovornosti:">
        CLEANME omogućava korisnicima prijavu problema u javnom interesu, ali ne
        snosi odgovornost za tačnost prijavljenih informacija. Sve prijave su
        podložne proveri od strane nadležnih komunalnih službi. E-SEO TEAM nije
        odgovoran za kašnjenja ili neizvršavanje prijava od strane komunalnih
        službi.
      </TextBlock>

      <TextBlock caption="Autorska prava:">
        Sadržaj, dizajn i koncept sajta zaštićeni su autorskim pravima i
        vlasništvo su E-SEO TEAM-a Svako kopiranje, preuzimanje ili
        reprodukovanje sadržaja bez dozvole je zabranjeno.
      </TextBlock>

      <TextBlock caption="Zaštita podataka:">
        CLEANME obrađuje podatke u skladu sa Zakonom o zaštiti podataka o
        ličnosti. Lični podaci koji se prikupljaju kroz prijave koriste se
        isključivo za potrebe obrade prijave i neće biti deljeni sa trećim
        licima, osim u slučajevima predviđenim zakonom.
      </TextBlock>

      <TextBlock caption="Ažuriranje i održavanje sajta:">
        E-SEO TEAM redovno ažurira sadržaj sajta i zadržava pravo izmene
        informacija na ovoj stranici u bilo kom trenutku bez prethodnog
        obaveštenja.
      </TextBlock>
    </>
  );
};

export default ImpressumPage;
