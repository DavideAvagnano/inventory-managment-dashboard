"use client";

import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { setIsSidebarCollapsed } from "@/redux/store";
import { SidebarLink } from "@/components/Sidebar/sidebar-link";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";

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
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          label="Dashboard"
          icon={Layout}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          label="Inventory"
          icon={Archive}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          label="Products"
          icon={Clipboard}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          label="Users"
          icon={User}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          label="Settings"
          icon={SlidersHorizontal}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          label="Expenses"
          icon={CircleDollarSign}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* footer */}
      <div className={clsx(isSidebarCollapsed ? "hidden" : "block", "mb-10")}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Davstock
        </p>
      </div>
    </div>
  );
};
