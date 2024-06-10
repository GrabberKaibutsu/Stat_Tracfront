import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/users/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          console.error("Logout failed:", response.statusText);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        logout();

        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    logoutUser();
  }, [navigate, logout]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white">
      <div className="p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-2xl border border-yellow-500">
        <h1 className="text-2xl font-bold text-center text-yellow-300">Logging out...</h1>
      </div>
    </div>
  );
};

export default Logout;