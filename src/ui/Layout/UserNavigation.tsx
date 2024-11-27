import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { User } from "../../types";
import avatar from "../../assets/user-circle-svgrepo-com.svg";

const UserNavigation = ({
  user,
  logout,
}: {
  user: User | null;
  logout: () => void;
}) => {
  return (
    <div className="userarea flex flex-1 xl:flex-none justify-end md:justify-end gap-2 items-center pe-2 md:pe-3 ">
      <img
        src={avatar}
        alt={user!.firstname + user!.lastname}
        className="w-5 h-5 md:w-6 md:h-6 rounded-full"
      />
      <p className="hidden md:block leading-4">
        {user?.firstname} {user?.lastname}
        <span className="block text-[11px]">{user?.email}</span>
      </p>

      <HiArrowRightOnRectangle
        className="text-[24px]"
        onClick={logout}
        cursor={"pointer"}
      />
    </div>
  );
};

export default UserNavigation;
