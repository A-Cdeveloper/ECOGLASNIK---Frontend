import Logo from "./Logo";
import MainNavigation from "./MainNavigation";

import useAuth from "../../context/useAuth";
import UserNavigation from "./UserNavigation";

const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="w-full h-auto py-1 md:py-0 px-2 border-b-2 border-secondary-500/20 flex flex-wrap items-center justify-between bg-primary-500 gap-x-0 md-gap-x-6 fixed top-0 z-[99999999999999999]">
      <Logo />
      <MainNavigation isAuthenticated={isAuthenticated} userId={user?.uid} />

      {isAuthenticated && <UserNavigation user={user} />}
    </header>
  );
};

export default Header;
