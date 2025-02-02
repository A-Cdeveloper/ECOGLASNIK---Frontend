import logo3 from "../../../assets/e-seo.png";
import logo4 from "../../../assets/infodesk.png";
import logo5 from "../../../assets/vercel.png";
import logo6 from "../../../assets/bgsvetionik.png";
import logo7 from "../../../assets/pinata.png";

const logos = [logo3, logo4, logo5, logo6, logo7];

const Partners = () => {
  return (
    <div className="relative w-full overflow-hidden flex-1 mx-[20px]">
      <div className="flex w-max animate-scroll">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo ${index + 1}`}
            className="mx-3 h-[50px] grayscale opacity-35"
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
