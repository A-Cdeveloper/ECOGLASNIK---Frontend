import { useState } from "react";
import MenuItems from "./MenuItems";
import burgerBtn from "../assets/burger-menu.svg";

const MainNavigation = ({
  isAuthenticated,
  userId,
}: {
  isAuthenticated: boolean;
  userId?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="xl:hidden bg-transparent w-[35px] h-[25px] text-white order-2 cursor-pointer -mt-2"
        onClick={toggleMenu}
      >
        <img src={burgerBtn} alt="" />
      </div>
      {/* // Desktop menu */}
      <nav className="hidden xl:block">
        <ul className="flex justify-center lg:justify-end uppercase gap-4 font-bold">
          <MenuItems isAuthenticated={isAuthenticated} userId={userId} />
        </ul>
      </nav>
      {/* 
      // Mobile menu */}
      {isOpen && (
        <nav className="block xl:hidden order-3 w-[300px] md:w-full ms-auto md:ms-0">
          <ul className="flex flex-wrap uppercase gap-x-4 font-bold py-2 justify-end">
            <MenuItems isAuthenticated={isAuthenticated} userId={userId} />
          </ul>
        </nav>
      )}
    </>
  );
};

export default MainNavigation;
