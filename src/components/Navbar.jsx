import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (location.pathname === "/auth") {
    return null;
  }
  return (
    <nav>
      <Link to={"/"} className="title">
        Jaraahai
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to={"/auth"} className="create-account">
            Create Account
          </NavLink>
        </li>
        <li>
          <NavLink to={"/auth"} className="login-account">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
