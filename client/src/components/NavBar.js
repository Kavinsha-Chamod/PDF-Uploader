import React, { useContext } from "react";
import authMiddleware from "../middlewares/authMiddleware";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { user, setUser } = useContext(authMiddleware);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <Link className="navbar-brand">PDF UPLOADER</Link>
      <div className="nav">
        {user ? (
          <button onClick={handleLogout} className="btn btn-primary">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="btn btn-outline-primary mr-2">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-primary">Signup</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
