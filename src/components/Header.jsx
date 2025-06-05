import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { logoutUser } from "../utils/api";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";


const Header = () => {
  const { isLogedin, setisLogedin, userDetail, setuserDetail } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setisLogedin(false);
      setuserDetail(null);
      setIsDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleProfile = () => {
    setIsDropdownOpen(false);
    navigate(`/profile/${userDetail?.username}`);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setShowMobileSearch(false); // hide overlay on mobile
    }
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".dropdown-menu")) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isDropdownOpen]);

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-gray-800 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center ">
        <img src="/assets/logos/logo.png" alt="Logo" className="h-8 md:h-10" />
        < lable className=" text-xl ml-1 hover:text-gray-300" > YouTube </lable>
      </Link>

      {/* Search bar (hidden on small screens) */}
      <div className="flex-1 hidden md:flex justify-center px-4">
        <div className="flex w-3/4 max-w-xl">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full p-2 text-sm text-white bg-gray-800 rounded-l-md border border-gray-600 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-r-md"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Right side - Mobile search, Login/Profile */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Icon */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setShowMobileSearch(true)}
        >
          <FiSearch />
        </button>

        {!isLogedin ? (
          <Link to="/Login">
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              Login
            </button>
          </Link>
        ) : (
          <div className="relative dropdown-menu">
            <button
              className="flex items-center justify-center w-10 h-10 rounded-full"
              onClick={toggleDropdown}
            >
              <img
                src={userDetail?.avatar}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </button>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-[#2c2c2c] rounded-xl shadow-xl border border-gray-700 z-[9999] overflow-hidden"
              >
                <div className="flex items-center gap-4 p-4">
                  <img
                    src={userDetail?.avatar}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover border border-gray-600"
                  />
                  <div className="text-sm">
                    <p className="text-white font-semibold">{userDetail?.fullName}</p>
                    <p className="text-gray-400">{userDetail?.email}</p>
                  </div>
                </div>

                <div className="border-t border-gray-700">
                  <button
                    onClick={handleProfile}
                    className="w-full px-5 py-3 text-left text-white hover:bg-gray-700 transition duration-150"
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-5 py-3 text-left text-red-400 hover:bg-gray-800 transition duration-150"
                  >
                    🚪 Logout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex flex-col p-4 animate-fadeIn">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowMobileSearch(false)}
              className="text-white text-3xl"
            >
              <IoMdClose />
            </button>
          </div>
          <div className="flex w-full items-center">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full p-3 text-lg text-white bg-gray-800 rounded-l-md border border-gray-600 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-r-md text-lg"
            >
              🔍
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;
