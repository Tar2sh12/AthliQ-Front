import React, { useEffect } from "react";
import { removeAuthToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.async = true;
    document.head.appendChild(tailwindScript);

    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
    document.head.appendChild(fontAwesomeLink);

    return () => {
      document.head.removeChild(tailwindScript);
      document.head.removeChild(fontAwesomeLink);
    };
  }, []);
  const handleLogout = () => {
    removeAuthToken();
    navigate("/login");
  }

  const handleCreateChild = () => {

    navigate("/user-home");
  }

  //allchildren
  const handleAllChildren = () => {
    navigate("/allchildren");
  }
  return (
    <>
      <header className="bg-green-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">ChampionMaker</h1>
          <nav className="flex space-x-4">
            <a onClick={handleCreateChild} href="" className="text-white hover:text-gray-300">
              Create Child
            </a>
            <a onClick={handleAllChildren} className="text-white hover:text-gray-300">
              my children
            </a>

            <button onClick={handleLogout} class="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300 flex items-center">
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
