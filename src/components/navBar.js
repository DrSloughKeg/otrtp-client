import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";

function Navbar() {
  //navigate
  let navi = useNavigate();
  //authState
  const { setAuthState } = useContext(AuthContext);
  //logout button
  const logout = () => {
    setAuthState(false);
    localStorage.removeItem("accessToken");
    navi("/");
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src="banner.png" alt="home" />
      </Link>
      <button className="Special" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
