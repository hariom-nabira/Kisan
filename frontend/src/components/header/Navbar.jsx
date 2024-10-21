import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaLeaf, FaTractor, FaSeedling } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, setTokens }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setTokens({ accessToken: null, refreshToken: null });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-800 text-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FaLeaf className="h-8 w-8 text-green-300 mr-2" />
              <span className="font-bold text-xl">Kisan</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                  <FaSeedling className="mr-1" />
                  Home
                </Link>
                <Link to="/crops" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                  <FaTractor className="mr-1" />
                  Crops
                </Link>
                <Link to="/services" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-green-700">
                  <FaLeaf className="mr-1" />
                  Services
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-green-600 hover:bg-green-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-yellow-600 hover:bg-yellow-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-green-300 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
            onClick={toggleMenu}
          >
            <FaSeedling className="mr-2" />
            Home
          </Link>
          <Link
            to="/crops"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
            onClick={toggleMenu}
          >
            <FaTractor className="mr-2" />
            Crops
          </Link>
          <Link
            to="/services"
            className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-green-700"
            onClick={toggleMenu}
          >
            <FaLeaf className="mr-2" />
            Services
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-green-700">
          <div className="flex items-center px-5">
            <FaUser className="h-6 w-6 rounded-full text-green-300" />
            <div className="ml-3">
              <div className="text-base font-medium leading-none">
                {isAuthenticated ? 'Farmer Name' : 'Guest'}
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-yellow-600 hover:bg-yellow-700"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
