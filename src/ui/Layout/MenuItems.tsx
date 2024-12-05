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
          to="/problems/add"
          className={({ isActive }) =>
            isActive
              ? "text-white bg-yellow-500 py-1 px-2"
              : "text-winter-100/80 bg-yellow-500/80 py-1 px-2 hover:text-white hover:bg-yellow-500"
          }
        >
          Dodaj Problem
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "ms-0 text-white"
              : "ms-0  text-secondary-100 hover:text-white"
          }
        >
          Svi problemi
        </NavLink>
      </li>

      {isAuthenticated && (
        <li>
          <NavLink
            to={`/problems/user/${userId}`}
            className={({ isActive }) =>
              isActive
                ? "ms-0 text-white"
                : "ms-0  text-secondary-100 hover:text-white"
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
              ? "ms-0 text-white"
              : "ms-0  text-secondary-100 hover:text-white"
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
              isActive
                ? "ms-0 text-white"
                : "ms-0  text-secondary-100 hover:text-white"
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
