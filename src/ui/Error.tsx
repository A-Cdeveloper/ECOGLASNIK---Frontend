import { useNavigate } from "react-router-dom";
import Button from "./Buttons/Button";

const Error = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full h-auto lg:h-[500px] flex flex-col items-center justify-start lg:justify-center mt-5 lg:mt-0 ${className}`}
    >
      <span className="text-center font-regular text-[20px] block w-full mb-3">
        {message}
      </span>
      <Button variation="info" size="large" onClick={() => navigate(0)}>
        Probaj ponovo
      </Button>
    </div>
  );
};

export default Error;
