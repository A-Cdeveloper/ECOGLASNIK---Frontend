import Headline from "./Headline";

const TextBlock = ({
  caption,
  children,
}: {
  caption?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Headline level={3} className="my-2">
        {caption}
      </Headline>
      <p className="opacity-75">{children}</p>
    </>
  );
};

export default TextBlock;
