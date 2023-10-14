import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
