import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  //navigate
  let navi = useNavigate();
  //logout button
  const logout = () => {
    localStorage.removeItem("accessToken");
    navi("/");
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src="banner600.png" alt="home" />
      </Link>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
