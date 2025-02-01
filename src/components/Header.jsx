import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { logoutUser } from '../utils/api';

const Header = () => {
  const { isLogedin, setisLogedin } = useContext(UserContext);
  const { userDetail, setuserDetail } = useContext(UserContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setisLogedin(false);
      setuserDetail(null);
      setIsDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };


  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown-menu')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen]);
  
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
          <div className="relative dropdown-menu">
            {/* Avatar button to toggle dropdown */}
            <button
              className="flex items-center justify-center w-11 h-11 rounded-full"
              onClick={toggleDropdown}
            >
              <img
                src={userDetail.avatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {/* Dropdown menu, conditionally rendered based on isDropdownOpen */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg border border-gray-700">
                <div className="flex items-center bg-gray-800 rounded-lg p-4">
                  <img
                    src={userDetail.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="text-white font-bold">{userDetail.fullName}</p>
                    <p className="text-gray-400 text-sm">{userDetail.email}</p>
                  </div>
                </div>
                <hr className="border-gray-700" />
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-700 text-white transition"
                >
                  Profile
                </button>
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
