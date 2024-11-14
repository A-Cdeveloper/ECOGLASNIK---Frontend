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
};

const Input = ({
  type,
  placeholder,
  name,
  value,
  defaultValue,
  required,
  onChange,
  className,
  ...rest
}: InputType) => {
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
      accept={rest.accept}
      {...rest}
    />
  );
};

export default Input;
