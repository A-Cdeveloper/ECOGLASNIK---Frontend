import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-[450px] h-screen border-e border-secondary/50 p-3 overflow-hidden pb-[150px]">
      <Outlet />
    </aside>
  );
};

export default Sidebar;
