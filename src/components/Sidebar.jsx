import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ hideSidebar }) => {
  const menuItems = [
    { name: "Home", icon: "home.png" },
    { name: "Liked Videos", icon: "liked.png" },
    { name: "History", icon: "history.png" },
    { name: "My Content", icon: "content.png" },
    { name: "Collection", icon: "collection.png" },
    { name: "Subscribers", icon: "subscribers.png" },
  ];

  const bottomMenuItems = [
    { name: "Support", icon: "support.png" },
    { name: "Settings", icon: "settings.png" },
  ];

  return (
    <aside
      className={`bg-black border-r border-gray-700 flex flex-col justify-between h-screen p-4 transition-all duration-300  ${hideSidebar ? "w-20" : "w-64"
        }`}
    >
      <div>
        <div className= "flex items-center mb-6 justify-center" >
          <Link to="/">
            <img src="/assets/logos/logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-gray-800  ${hideSidebar ? "justify-center" : ""
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
            className={`w-full flex items-center text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-gray-800 ${hideSidebar ? "justify-center" : ""
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
