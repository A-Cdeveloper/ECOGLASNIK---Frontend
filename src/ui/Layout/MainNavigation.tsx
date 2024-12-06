import { useState } from "react";
import MenuItems from "./MenuItems";
import burgerBtn from "../../assets/burger-menu.svg";

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
          <MenuItems
            isAuthenticated={isAuthenticated}
            userId={userId}
            setIsOpen={setIsOpen}
          />
        </ul>
      </nav>
      {/* 
      // Mobile menu */}
      {isOpen && (
        <nav className="flex justify-end xl:hidden order-3 w-[375px] md:w-full ms-auto md:ms-0 text-right">
          <ul className="uppercase  font-bold py-2 space-y-1 pe-1">
            <MenuItems
              isAuthenticated={isAuthenticated}
              userId={userId}
              setIsOpen={setIsOpen}
            />
          </ul>
        </nav>
      )}
    </>
  );
};

export default MainNavigation;
