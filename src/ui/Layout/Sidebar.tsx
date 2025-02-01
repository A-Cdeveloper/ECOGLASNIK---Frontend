import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside
      className="w-full lg:w-1/2 xl:w-[450px] h-auto lg:h-[90vh] border-e border-secondary-500/50 p-3 
    overflow-auto pb-[30px] lg:pb-[100px] order-2 lg:order-1 custum-scrollbar mt-0 lg:mt-[70px] bg-red-600"
    >
      <Outlet />
    </aside>
  );
};

export default Sidebar;
