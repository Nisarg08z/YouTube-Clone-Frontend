import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Sidebar = ({ hideSidebar }) => {
  const { isLogedin } = useContext(UserContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: "home.png", path: "/" },
    { name: "Liked Videos", icon: "liked.png", path: "/like/Videos" },
    { name: "History", icon: "history.png", path: "/WatchHistory" },
    { name: "My Content", icon: "content.png", path: "/Content" },
    { name: "Collection", icon: "collection.png", path: "/Playlist" },
    { name: "Subscribers", icon: "subscribers.png", path: "/Subscribers" },
  ];

  const bottomMenuItems = [
    { name: "Support", icon: "support.png", path: "/" },
    { name: "Settings", icon: "settings.png", path: "/Setting" },
  ];

  const handleNavigation = (path) => {
    if (!isLogedin) {
      navigate("/login");  // Redirect to login if not logged in
    } else {
      navigate(path);  // Navigate to the desired path if logged in
    }
  };

  return (
    <aside
      className={`bg-black border-r border-gray-700 flex flex-col justify-between h-screen p-4 transition-all duration-300 ${
        hideSidebar ? "w-20" : "w-64"
      }`}
    >
      <div>
        <div className="flex items-center mb-6 justify-center">
          <Link to="/">
            <img src="/assets/logos/logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-gray-800 ${
                hideSidebar ? "justify-center" : ""
              }`}
            >
              <img
                src={`../assets/icons/${item.icon}`}
                alt={item.name}
                className="h-6"
              />
              {!hideSidebar && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div>
        {bottomMenuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`w-full flex items-center text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-gray-800 ${
              hideSidebar ? "justify-center" : ""
            }`}
          >
            <img
              src={`../assets/icons/${item.icon}`}
              alt={item.name}
              className="h-6"
            />
            {!hideSidebar && <span className="ml-3">{item.name}</span>}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
