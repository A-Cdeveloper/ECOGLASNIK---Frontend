import { Link } from "react-router-dom";
import logo from "../assets/clean-me.fw.png";

const Logo = () => {
  return (
    <div id="logo" className="flex-1 lg:flex-none">
      <Link to="/">
        <img src={logo} alt="" className="max-w-[250px] mx-auto md:mx-0" />
      </Link>
    </div>
  );
};

export default Logo;
