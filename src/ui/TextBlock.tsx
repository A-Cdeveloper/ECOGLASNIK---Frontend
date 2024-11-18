import Headline from "./Headline";

const TextBlock = ({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Headline level={2} className="my-2">
        {caption}
      </Headline>
      <p>{children}</p>
    </>
  );
};

export default TextBlock;
