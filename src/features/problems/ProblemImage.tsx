import noimage from "../../assets/no-image.png";

const ProblemImage = ({
  image,
  alt,
  className,
}: {
  image: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={className}>
      <img
        src={image || noimage}
        alt={alt}
        className="w-full h-full object-cover position-center"
      />
    </div>
  );
};

export default ProblemImage;
