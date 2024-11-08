import { useNavigate } from "react-router-dom";
import Button from "./Buttons/Button";

const NoResourceFound = ({ resources }: { resources: string }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center">
      <span className="text-center font-regular text-[20px] block w-full mb-3">
        Nema pronađenih!
      </span>
      <Button
        variation="danger"
        size="large"
        onClick={() => navigate("/problems/add")}
      >
        Prijavi novi {resources}
      </Button>
    </div>
  );
};

export default NoResourceFound;
