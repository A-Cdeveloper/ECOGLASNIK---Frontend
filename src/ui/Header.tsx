import Logo from "./Logo";
import MainNavigation from "./MainNavigation";
import UserNavigation from "./UserNavigation";

const Header = () => {
  return (
    <header className="w-full h-auto py-0 px-2 border-b-3 border-secondary/50 flex  items-center bg-secondary/30 gap-6">
      <Logo />
      <MainNavigation />
      <UserNavigation />
    </header>
  );
};

export default Header;
