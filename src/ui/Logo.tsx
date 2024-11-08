import { Link } from "react-router-dom";
import logo from "../assets/clean-me.fw.png";

const Logo = () => {
  return (
    <div id="logo" className="">
      <Link to="/">
        <img src={logo} alt="" className="w-[250px]" />
      </Link>
    </div>
  );
};

export default Logo;
