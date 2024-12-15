export type ButtonIconType = {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseOver?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

const ButtonIcon = ({
  icon,
  onClick,
  onMouseOver,
  type,
  ...props
}: ButtonIconType) => {
  return (
    <button
      type={type}
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
