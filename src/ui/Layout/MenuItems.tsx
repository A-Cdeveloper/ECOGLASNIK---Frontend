import { NavLink } from "react-router-dom";

const MenuItems = ({
  isAuthenticated,
  userId,
  setIsOpen,
}: {
  isAuthenticated: boolean;
  userId?: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <li>
        <NavLink
          to="/problems/add"
          onClick={() => setIsOpen(false)}
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
          onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
          onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
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
