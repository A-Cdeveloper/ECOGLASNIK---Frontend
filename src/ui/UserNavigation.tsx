import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";

const UserNavigation = () => {
  return (
    <div className="userarea flex justify-between items-center gap-4 ms-auto">
      <img
        src="https://randomuser.me/api/portraits/men/23.jpg"
        alt="user"
        className="w-9 h-9 rounded-full"
      />
      <p>
        Aleksandar Cvetković{" "}
        <span className="block text-[11px]">
          aleksandar.cvetkovic@gmail.com
        </span>
      </p>
      <HiOutlineUser className="text-xl" />
      <HiArrowRightOnRectangle className="text-xl" />
    </div>
  );
};

export default UserNavigation;
