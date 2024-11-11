import { NavLink } from "react-router-dom";

const MainNavigation = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <nav className="flex-1 order-2 lg:order-1 w-full pt-3 pb-2">
      <ul className="flex justify-center lg:justify-end uppercase gap-5 font-bold pe-4">
        {!isAuthenticated && (
          <li>
            <NavLink
              to="/problems/add"
              className={({ isActive }) =>
                isActive ? "text-winter" : "text-secondary hover:text-winter"
              }
            >
              Uloguj se
            </NavLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <NavLink
              to="/problems/add"
              className={({ isActive }) =>
                isActive ? "text-winter" : "text-secondary hover:text-winter"
              }
            >
              Dodaj Problem
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/impressum"
            className={({ isActive }) =>
              isActive ? "text-winter" : "text-secondary hover:text-winter"
            }
          >
            Impressum
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
