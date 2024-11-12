import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { User } from "../types";
import avatar from "../assets/user-circle-svgrepo-com.svg";

const UserNavigation = ({
  user,
  logout,
}: {
  user: User | null;
  logout: () => void;
}) => {
  return (
    <div className="userarea flex justify-center md:justify-end gap-2 items-center basis-full md:basis-1/2 lg:basis-auto order-1 lg:order-2">
      <img
        src={avatar}
        alt={user!.firstname + user!.lastname}
        className="w-8 h-8 rounded-full"
      />
      <p>
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
