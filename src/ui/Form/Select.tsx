import { ProblemCategory } from "../../types";

type SelectType = {
  name?: string;
  value?: number | string;
  placeholder?: string;
  ariaDescription?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  className?: string;
  options: ProblemCategory[];
  disabled?: boolean;
};

const Select = ({
  name,
  value,
  placeholder = "Izaberi kategoriju",
  ariaDescription = "",
  onChange,
  options = [],
  required = false,
  className = "",
  disabled,
  ...rest
}: SelectType) => {
  return (
    <select
      name={name}
      aria-description={ariaDescription}
      value={value}
      onChange={onChange}
      required={required}
      className={`${className}`}
      disabled={disabled}
      {...rest}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.cat_id} value={option.cat_id}>
          {option.cat_name}
        </option>
      ))}
    </select>
  );
};

export default Select;
