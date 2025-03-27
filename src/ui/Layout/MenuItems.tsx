import { NavLink } from "react-router-dom";
import { TranslationContext } from "../../context/translationContext";
import { use } from "react";

const MenuItems = ({
  isAuthenticated,
  userId,
  setIsOpen,
}: {
  isAuthenticated: boolean;
  userId?: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = use(TranslationContext);
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
          {t("menu.add_problem")}
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
          {t("menu.all_problems")}
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
            {t("menu.your_problems")}
          </NavLink>
        </li>
      )}

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
            {t("menu.login")}
          </NavLink>
        </li>
      )}
    </>
  );
};

export default MenuItems;
