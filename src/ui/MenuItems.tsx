import { NavLink } from "react-router-dom";

const MenuItems = ({
  isAuthenticated,
  userId,
}: {
  isAuthenticated: boolean;
  userId?: number;
}) => {
  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-winter" : "text-secondary hover:text-winter"
          }
        >
          Svi problemi
        </NavLink>
      </li>

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
      {isAuthenticated && (
        <li>
          <NavLink
            to={`/problems/user/${userId}`}
            className={({ isActive }) =>
              isActive ? "text-winter" : "text-secondary hover:text-winter"
            }
          >
            Vaše prijave
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/impressum"
          className={({ isActive }) =>
            isActive
              ? "ms-0 text-winter"
              : "ms-0  text-secondary hover:text-winter"
          }
        >
          Impressum
        </NavLink>
      </li>
      {!isAuthenticated && (
        <li>
          <NavLink
            to="/login/?mode=login"
            className={({ isActive }) =>
              isActive ? "text-winter" : "text-secondary hover:text-winter"
            }
          >
            Uloguj se
          </NavLink>
        </li>
      )}
    </>
  );
};

export default MenuItems;
