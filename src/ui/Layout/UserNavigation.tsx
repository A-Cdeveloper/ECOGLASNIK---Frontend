import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { User } from "../../types";
import avatar from "../../assets/user-circle-svgrepo-com.svg";
import useLogout from "../../features/auth/hooks/useLogout";
import { Link } from "react-router-dom";

const UserNavigation = ({ user }: { user: User | null }) => {
  const { mutate: logoutUser } = useLogout();
  return (
    <div className="userarea flex flex-1 xl:flex-none justify-end md:justify-end gap-2 items-center pe-2 md:pe-3">
      <Link to="/profile" className="flex items-center gap-2">
        <img
          src={avatar}
          alt={user!.firstname + user!.lastname}
          className="w-5 h-5 md:w-6 md:h-6 rounded-full"
        />

        <p className="hidden md:block leading-4">
          {user?.firstname} {user?.lastname}
          <span className="block text-[11px]">{user?.email}</span>
        </p>
      </Link>

      <HiArrowRightOnRectangle
        className="text-[24px]"
        onClick={() => logoutUser()}
        cursor={"pointer"}
      />
    </div>
  );
};

export default UserNavigation;
