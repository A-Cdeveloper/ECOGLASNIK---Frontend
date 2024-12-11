export type ButtonIconType = {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseOver?: () => void;
};

const ButtonIcon = ({
  icon,
  onClick,
  onMouseOver,
  ...props
}: ButtonIconType) => {
  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      className="border-transparent absolute top-0 right-0"
      {...props}
    >
      <span className="text-[16px] mt-[2px] block text-secondary/70">
        {icon}
      </span>
    </button>
  );
};

export default ButtonIcon;
