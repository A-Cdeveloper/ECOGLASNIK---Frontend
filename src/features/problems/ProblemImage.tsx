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
        src={image || ""}
        alt={alt}
        className=" border-double border-4 border-secondary/50 object-cover position-center"
      />
    </div>
  );
};

export default ProblemImage;
