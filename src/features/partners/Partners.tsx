import { usePartners } from "./hooks/usePartners";

const Partners = () => {
  const { partners } = usePartners();

  const logos = partners?.map((partner) => partner.partnerLogo);

  return (
    <div className="relative w-full overflow-hidden flex-1 mx-[20px]">
      <div className="flex w-max animate-scroll">
        {logos &&
          [...logos, ...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index + 1}`}
              className="mx-3 h-[40px] grayscale opacity-35"
            />
          ))}
      </div>
    </div>
  );
};

export default Partners;
