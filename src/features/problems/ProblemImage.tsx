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
        className="w-full h-full object-cover position-center"
      />
    </div>
  );
};

export default ProblemImage;
