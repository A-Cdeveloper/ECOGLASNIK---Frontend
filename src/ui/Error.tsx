import { useNavigate } from "react-router-dom";
import Button from "./Buttons/Button";

const Error = ({ message }: { message: string }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100px] lg:h-[500px] flex flex-col items-center justify-center">
      <span className="text-center font-regular text-[20px] block w-full mb-3">
        {message}
      </span>
      <Button variation="primary" size="large" onClick={() => navigate(0)}>
        Probaj ponovo
      </Button>
    </div>
  );
};

export default Error;
