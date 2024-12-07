const WIcon = ({
  icon,
  text,
  className,
}: {
  icon: string;
  text: string;
  className: string;
}) => {
  return <img src={icon} alt={text} className={`${className} -ms-1`} />;
};

export default WIcon;
