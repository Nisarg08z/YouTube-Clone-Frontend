import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Sidebar = ({ collapsed = false }) => {
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
    { name: "Settings", icon: "settings.png", path: "/Setting" },
  ];

  const publicPaths = ["/"];

  const handleNavigation = (path) => {
    if (publicPaths.includes(path)) {
      navigate(path);
      return;
    }
    if (!isLogedin) {
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#1e1e1e] border-r border-gray-800 ${
          collapsed ? "w-20" : "w-48"
        } h-screen fixed left-0 top-0 z-40 transition-all duration-300`}
      >

        <nav className="flex-1 mt-20 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center text-gray-300 hover:text-white p-2 px-7 rounded hover:bg-gray-800 transition-all duration-200 w-full"
            >
              <img
                src={`/assets/icons/${item.icon}`}
                alt={item.name}
                className="h-6"
              />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-auto mb-4">
          {bottomMenuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center text-gray-300 hover:text-white p-2 px-7 rounded hover:bg-gray-800 transition-all duration-200 w-full"
            >
              <img
                src={`/assets/icons/${item.icon}`}
                alt={item.name}
                className="h-6"
              />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Always show icons, no labels */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1e1e1e] border-r border-gray-800 flex justify-around py-2">
        {[...menuItems, ...bottomMenuItems].map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className="flex flex-col items-center text-gray-300 hover:text-white transition-all duration-200"
          >
            <img
              src={`/assets/icons/${item.icon}`}
              alt={item.name}
              className="h-6"
            />
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
