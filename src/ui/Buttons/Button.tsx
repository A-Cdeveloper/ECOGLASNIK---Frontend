import React from "react";

export type ButtonType = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large"; // Use specific strings for type safety
  variation?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info";
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  children,
  style,
  size = "medium",
  variation = "primary",
  disabled,
  onClick,
}: ButtonType) => {
  return (
    <button
      style={style}
      className={`${variation} ${size}`}
      onClick={onClick}
      disabled={!!disabled}
    >
      {children}
    </button>
  );
};

export default Button;
