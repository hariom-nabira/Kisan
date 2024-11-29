import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaLeaf } from "react-icons/fa";

const Navbar = ({ isAuthenticated, setTokens }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setTokens({ accessToken: null, refreshToken: null });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaLeaf size={24} className="text-green-600" />
            <span className="text-xl font-bold text-green-800">
              Kisan
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="text-green-700 hover:text-green-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/predict/crop"
              className="block text-green-700 hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Crop Prediction
            </Link>
            <Link
              to="/predict/fertilizer"
              className="block text-green-700 hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Fertilizer Prediction
            </Link>
            <Link
              to="/predict/idealCrop"
              className="text-green-700 hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Crops
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-green-700 hover:text-green-500 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-green-700 hover:text-green-500"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/services"
              className="block text-green-700 hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/predict/crop"
              className="block text-green-700 hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Crop Prediction
            </Link>
            <Link
              to="/predict/fertilizer"
              className="block text-green-700 hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Fertilizer Prediction
            </Link>
            <Link
              to="/crops"
              className="block text-green-700 hover:text-green-500 transition duration-300"
              onClick={toggleMenu}
            >
              Crops
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-left text-red-600 hover:text-red-500 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-green-700 hover:text-green-500 transition duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-500 transition duration-300"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;