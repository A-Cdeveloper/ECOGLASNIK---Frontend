import Logo from "./Logo";
import MainNavigation from "./MainNavigation";
import SimulateAuthUser from "./SimulateAuthUser";

const Header = () => {
  return (
    <header className="w-full h-auto py-0 px-2 border-b-3 border-secondary/50 flex flex-wrap items-center justify-between bg-secondary/30 gap-x-0 md-gap-x-6">
      <Logo />
      <MainNavigation />
      <SimulateAuthUser />
      {/* <UserNavigation /> */}
    </header>
  );
};

export default Header;
