import Headline from "../ui/Headline";
import notfound from "../assets/404.png";
import Button from "../ui/Buttons/Button";
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-center items-center w-full h-screen">
      <div className="text-center space-y-4">
        <img src={notfound} alt="not found" className="w-[300px]" />
        <Headline level={2}>Stranica nije pronađena.</Headline>
        <Button variation="primary" size="large" onClick={() => navigate("/")}>
          Home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
