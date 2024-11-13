type TextAreaType = {
  placeholder?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  ariaDescription?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
};

const TextArea = ({
  placeholder,
  name,
  value,
  defaultValue,
  required,
  onChange,
  className,
  ...rest
}: TextAreaType) => {
  return (
    <textarea
      placeholder={placeholder}
      name={name}
      value={value}
      defaultValue={defaultValue}
      required={required}
      onChange={onChange}
      className={`input ${className}`}
      {...rest}
    />
  );
};

export default TextArea;
