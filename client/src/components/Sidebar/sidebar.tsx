"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { setIsSidebarCollapsed } from "@/redux/store";

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <div
      className={clsx(
        "fixed z-40 flex flex-col h-full bg-white transition-all duration-300 overflow-hidden shadow-md",
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
      )}
    >
      {/* top logo */}
      <div
        className={clsx(
          "flex gap-3 justify-between md:justify-normal items-center pt-8",
          isSidebarCollapsed ? "px-5" : "px-8"
        )}
      >
        <div>logo</div>
        <h1
          className={clsx(
            "font-extrabold text-2xl",
            isSidebarCollapsed ? "hidden" : "block"
          )}
        >
          DAVSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu size={14} />
        </button>
      </div>

      {/* links */}
      <div className="flex-grow mt-8">{/* links here */}</div>

      {/* footer */}
      <div className="mb-10">
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Davstock
        </p>
      </div>
    </div>
  );
};
