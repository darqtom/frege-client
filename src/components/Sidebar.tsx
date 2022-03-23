import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Logo from "./Logo";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <>
      <div
        className={`fixed top-0 left-0 bg-white shadow-md shadow-gray-300 w-full md:w-96 h-full ${
          sidebarVisible
            ? "translate-x-0 opacity-100 z-20 pointer-events-all"
            : "-translate-x-full opacity-0 z-10 pointer-events-none "
        } transition-all ease-in-out duration-500`}
      >
        <div
          className="py-3 px-4 hover:bg-violet-50 w-full mt-4 group"
          role={"button"}
          onClick={() => setSidebarVisible(!sidebarVisible)}
        >
          <div className="flex items-center">
            <XIcon className="w-6 h-6 text-gray-400  group-hover:text-violet-400" />
            <span className="ml-2 text=gray-800 group-hover:text-violet-500">
              Close
            </span>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-4 left-4 h-full ${
          sidebarVisible
            ? "z-10 opacity-0 pointer-events-none w-full md:w-[23rem]" // w-96 - w-4
            : "z-20 opacity-1 pointer-events-all w-32"
        } transition-all ease-in-out duration-500`}
      >
        <div className="flex items-center justify-evenly bg-white w-auto py-4 px-4 rounded-lg shadow-md shadow-gray-300 group cursor-pointer">
          <Logo />
          <MenuIcon
            className="w-6 h-6 text-gray-400 group-hover:scale-110  group-hover:text-gray-600 transition-transform transition-color"
            onClick={() => setSidebarVisible(!sidebarVisible)}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
