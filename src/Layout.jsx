import React, { useState, useEffect } from "react";
import { Header, Sidebar } from "./components";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const [hideSidebar, setHideSidebar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/video/") || location.pathname.startsWith("/Content") || location.pathname.startsWith("/Setting")) {
      setHideSidebar(true);
    } else {
      setHideSidebar(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar hideSidebar={hideSidebar} />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
