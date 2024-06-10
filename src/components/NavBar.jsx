import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/logout");
  };

  const handleBack = () => {
    navigate(-1); // This navigates back to the previous page
  };

  const showBackButton = location.pathname !== "/" && location.pathname !== "/characters";

  return (
    <nav className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white p-4 fixed bottom-0 w-full flex flex-col sm:flex-row justify-between items-center shadow-lg z-50">
      <div className="home-link flex space-x-4 mb-2 sm:mb-0">
        <Link to="/" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105">
          Home
        </Link>
        {location.pathname !== "/" && (
          <Link to="/roll-dice" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105">
            Dice Roller
          </Link>
        )}
      </div>
      <div className="profile-section flex items-center space-x-4">
        {showBackButton && (
          <button 
            onClick={handleBack} 
            className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Back
          </button>
        )}
        {isAuthenticated ? (
          <>
            <span className="mr-4 text-yellow-300">Welcome, {user.username}!</span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </Link>
            <Link to="/signup" className="hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-105 ml-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;