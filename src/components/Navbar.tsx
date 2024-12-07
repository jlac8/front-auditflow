import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const isActive = ({ isActive }) => (isActive ? "active" : "");

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={isActive}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={isActive}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/invoice" className={isActive}>
            Invoice
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
