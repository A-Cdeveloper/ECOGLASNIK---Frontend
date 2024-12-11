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
  "data-testid"?: string;
};

const Button = ({
  children,
  style,
  size = "medium",
  variation = "primary",
  disabled,
  onClick,
  "data-testid": testId,
}: ButtonType) => {
  return (
    <button
      style={style}
      className={`${variation} ${size}`}
      onClick={onClick}
      disabled={!!disabled}
      data-testid={testId}
    >
      {children}
    </button>
  );
};

export default Button;
