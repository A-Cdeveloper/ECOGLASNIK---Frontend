import { forwardRef } from "react";

type InputType = {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  ariaDescription?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  accept?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputType>(
  (
    {
      type,
      placeholder,
      name,
      value,
      defaultValue,
      required,
      onChange,
      className,
      accept,
      ...rest
    },
    ref
  ) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
        className={className ? className : ""}
        accept={accept}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default Input;
