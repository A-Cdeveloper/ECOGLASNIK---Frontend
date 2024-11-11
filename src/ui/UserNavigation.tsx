import { HiArrowRightOnRectangle } from "react-icons/hi2";

const UserNavigation = () => {
  return (
    <div className="userarea flex justify-center lg:justify-end gap-2 items-center ms-auto  basis-full md:basis-1/2 lg:basis-auto order-1 lg:order-2">
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

      <HiArrowRightOnRectangle className="text-[24px]" />
    </div>
  );
};

export default UserNavigation;
