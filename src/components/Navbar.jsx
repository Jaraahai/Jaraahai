import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import useAuthState from "../hooks/useAuthState";
import AuthNavbar from "./AuthNavbar";

export const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthState();

  if (location.pathname === "/auth" || user) {
    return null;
  }
  return (
    <nav>
      <Link to={"/"} className="title">
        Logo
      </Link>
      {user ? null : (
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
      )}
      <ul className={menuOpen ? "open" : ""}>
        {user ? (
          <AuthNavbar />
        ) : (
          <>
            <li>
              <NavLink to={"/auth"} className="create-account">
                CREATE ACCOUNT
              </NavLink>
            </li>
            <li>
              <NavLink to={"/auth"} className="login-account">
                LOGIN
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
