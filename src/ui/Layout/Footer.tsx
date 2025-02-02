import FooterBoxWeather from "../../features/weather/FooterBoxWeather";
import MetaMenu from "./MetaMenu";
import Partners from "../../features/partners/Partners";

const Footer = () => {
  return (
    <div className="w-full h-[10vh] mt-[2vh] order-3 border-secondary-500/20 border-t-2 flex flex-wrap justify-between items-center  gap-y-4 lg:gap-y-0">
      <div className="w-full lg:w-auto">
        <FooterBoxWeather />
      </div>

      <Partners />

      <div className="text-center w-full lg:w-auto py-2 lg:py-0 me-4">
        <MetaMenu />
      </div>
    </div>
  );
};

export default Footer;
