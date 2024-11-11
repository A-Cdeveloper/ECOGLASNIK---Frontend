import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { User } from "../types";

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
        src="https://randomuser.me/api/portraits/men/23.jpg"
        alt="user"
        className="w-9 h-9 rounded-full"
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
