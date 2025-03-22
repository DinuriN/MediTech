import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");

   
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="log-out-button-users">
      Logout
    </button>
  );
};

export default Logout;
