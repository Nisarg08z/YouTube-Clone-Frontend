import React, { useState, useEffect } from "react";
import { Header, Sidebar } from "./components";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const [collapseSidebar, setCollapseSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const shouldCollapse =
      location.pathname.startsWith("/video/") ||
      location.pathname.startsWith("/Content") ||
      location.pathname.startsWith("/Setting");
    setCollapseSidebar(shouldCollapse);
  }, [location.pathname]);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col md:flex-row">
      <Sidebar collapsed={collapseSidebar} />
      <div className="flex flex-col flex-1">
        <Header />
        <main
          className={`flex-1 overflow-auto p-4 transition-all duration-300 ${
            collapseSidebar ? "md:ml-20" : "md:ml-48"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
