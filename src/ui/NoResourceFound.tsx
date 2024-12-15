import { useNavigate } from "react-router-dom";
import Button from "./Buttons/Button";

const NoResourceFound = ({ resources }: { resources: string }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto lg:h-[500px] flex flex-col items-center justify-start lg:justify-center mt-5 lg:mt-0">
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
