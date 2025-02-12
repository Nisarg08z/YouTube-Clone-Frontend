import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ hideSidebar }) => {
  const menuItems = [
    { name: "Home", icon: "home.png", path: "/" },
    { name: "Liked Videos", icon: "liked.png", path: "/like/Videos" },
    { name: "History", icon: "history.png", path: "/WatchHistory" },
    { name: "My Content", icon: "content.png", path: "/" },
    { name: "Collection", icon: "collection.png", path: "/" },
    { name: "Subscribers", icon: "subscribers.png", path: "/" },
  ];

  const bottomMenuItems = [
    { name: "Support", icon: "support.png", path: "/" },
    { name: "Settings", icon: "settings.png", path: "/" },
  ];

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
            <Link
              key={item.name}
              to={item.path}
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
            </Link>
          ))}
        </nav>
      </div>

      <div>
        {bottomMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
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
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
