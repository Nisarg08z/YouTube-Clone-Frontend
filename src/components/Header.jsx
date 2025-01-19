import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { logoutUser } from '../utils/api';

const Header = () => {
  const { isLogedin, setisLogedin } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setisLogedin(false);
      setIsDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <header className="flex justify-between items-center px-4 py-2 bg-gray-900 border-b border-gray-700">
      <input
        type="text"
        placeholder="Search"
        className="flex-1 p-2 mr-4 bg-gray-800 text-white rounded outline-none"
      />
      <div className="flex items-center space-x-4">
        {!isLogedin ? (
          <Link to="/Login">
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Login
            </button>
          </Link>
        ) : (
          <div className="relative">
            {/* Avatar button to toggle dropdown */}
            <button 
              className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full" 
              onClick={toggleDropdown}
            >
              {isLogedin.fullName ? isLogedin.fullName.charAt(0) : ''}
            </button>
            {/* Dropdown menu, conditionally rendered based on isDropdownOpen */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg border border-gray-700">
                <div className="px-4 py-2 text-white font-semibold">
                  {isLogedin.fullName}
                </div>
                <div className="px-4 py-2 text-gray-400 text-sm">
                  {isLogedin.email}
                </div>
                <hr className="border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-700 text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
