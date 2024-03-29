import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import Logo from "components/Logo";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 left-0 bg-white shadow-md shadow-gray-300 sidebar ${
          sidebarVisible ? "showSidebar" : "hideSidebar"
        } transitionAll`}
      >
        <div
          className="py-3 px-4 hover:bg-violet-50 w-full mt-4 group"
          role={"button"}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          <div className="flex items-center">
            <XMarkIcon className="w-6 h-6 text-gray-400  group-hover:text-violet-400" />
            <span className="ml-2 text-sm text=gray-800 group-hover:text-violet-500">
              Close
            </span>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-4 left-4 h-full ${
          sidebarVisible ? "hideMenu" : "showMenu"
        } transitionAll`}
      >
        <div className="whiteBox flex items-center justify-evenly w-auto py-3 px-4 group cursor-pointer">
          <Logo />
          <Bars3Icon
            className="w-6 h-6 text-gray-400 group-hover:scale-110  group-hover:text-gray-600 transition-transform transition-color"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
