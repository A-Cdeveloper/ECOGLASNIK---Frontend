import { Link } from "react-router-dom";
import logo from "../../assets/ecoglasnik.png";
import { APP_NAME } from "../../config";

const Logo = () => {
  return (
    <div id="logo" className="flex-1 lg:flex-none">
      <Link to="/">
        <img
          src={logo}
          alt={APP_NAME}
          className="max-w-[200px] md:max-w-[265px] mx-0"
          loading="lazy"
          fetchPriority="low"
        />
      </Link>
    </div>
  );
};

export default Logo;
