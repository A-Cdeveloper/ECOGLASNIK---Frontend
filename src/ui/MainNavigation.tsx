import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <nav>
      <ul className="flex uppercase gap-5 font-bold">
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
