import Logo from "./Logo";
import MainNavigation from "./MainNavigation";
//import SimulateAuthUser from "../SimulateAuthUser";
import useAuth from "../../context/useAuth";
import UserNavigation from "./UserNavigation";

const Header = () => {
  const { user, isAuthenticated, removeSessionStorageData } = useAuth();
  return (
    <header className="w-full h-auto py-0 px-2 border-b-3 border-secondary/50 flex flex-wrap items-center justify-between bg-primary gap-x-0 md-gap-x-6 fixed top-0 z-[99999999999999999] lg:relative">
      <Logo />
      <MainNavigation isAuthenticated={isAuthenticated} userId={user?.uid} />
      {/* <SimulateAuthUser /> */}
      {isAuthenticated && (
        <UserNavigation user={user} logout={removeSessionStorageData} />
      )}
    </header>
  );
};

export default Header;
