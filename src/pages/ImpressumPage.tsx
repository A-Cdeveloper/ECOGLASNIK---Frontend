import BackButton from "../ui/Buttons/BackButton";
import Headline from "../ui/Headline";

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
      <Headline level={2} className="my-2">
        Kontakt:
      </Headline>
      <p>
        Telefon: +381 637675989 <br />
        Email: cleanme@e-seo.info <br />
        Web: www.e-seo.info
      </p>
      <Headline level={2} className="my-2">
        Opis sajta
      </Headline>
      <p>
        CLEANME je online platforma koja omogućava građanima da prijave probleme
        u komunalnoj infrastrukturi putem interaktivne mape. Korisnici mogu lako
        i brzo prijaviti komunalne probleme poput oštećenih puteva, prepunih
        kontejnera, kvarova na uličnom osvetljenju i slično. Cilj sajta je da
        unapredi komunikaciju između građana i komunalnih službi, olakšavajući
        brzo rešavanje prijavljenih problema.
      </p>

      <Headline level={2} className="my-2">
        Odricanje od odgovornosti
      </Headline>
      <p>
        CLEANME omogućava korisnicima prijavu problema u javnom interesu, ali ne
        snosi odgovornost za tačnost prijavljenih informacija. Sve prijave su
        podložne proveri od strane nadležnih komunalnih službi. E-SEO TEAM nije
        odgovoran za kašnjenja ili neizvršavanje prijava od strane komunalnih
        službi.
      </p>

      <Headline level={2} className="my-2">
        Autorska prava
      </Headline>
      <p>
        Sadržaj, dizajn i koncept sajta zaštićeni su autorskim pravima i
        vlasništvo su E-SEO TEAM-a Svako kopiranje, preuzimanje ili
        reprodukovanje sadržaja bez dozvole je zabranjeno.{" "}
      </p>

      <Headline level={2} className="my-2">
        Zaštita podataka
      </Headline>
      <p>
        CLEANME obrađuje podatke u skladu sa Zakonom o zaštiti podataka o
        ličnosti. Lični podaci koji se prikupljaju kroz prijave koriste se
        isključivo za potrebe obrade prijave i neće biti deljeni sa trećim
        licima, osim u slučajevima predviđenim zakonom.
      </p>

      <Headline level={2} className="my-2">
        Ažuriranje i održavanje sajta
      </Headline>
      <p>
        E-SEO TEAM redovno ažurira sadržaj sajta i zadržava pravo izmene
        informacija na ovoj stranici u bilo kom trenutku bez prethodnog
        obaveštenja.
      </p>
    </>
  );
};

export default ImpressumPage;
