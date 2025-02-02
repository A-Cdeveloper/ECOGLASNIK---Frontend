import { NavLink } from "react-router-dom";

const MetaMenu = () => {
  return (
    <ul className="flex justify-center lg:justify-end uppercase gap-3 font-bold text-[13px]">
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "ms-0 text-white"
              : "ms-0  text-secondary-100 hover:text-white"
          }
        >
          Kontakt
        </NavLink>
      </li>

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
    </ul>
  );
};

export default MetaMenu;
