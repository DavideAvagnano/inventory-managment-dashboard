"use client";

import clsx from "clsx";
import { useEffect } from "react";

import { Sidebar } from "@/components/Sidebar/sidebar";
import { Navbar } from "@/components/Navbar/navbar";
import StoreProvider, { useAppSelector } from "@/redux/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div
      className={clsx(
        "flex bg-gray-50 text-gray-900 w-full min-h-screen",
        isDarkMode ? "dark" : "light"
      )}
    >
      <Sidebar />
      <main
        className={clsx(
          "flex flex-col w-full h-full py-7 px-9 bg-gray-50",
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        )}
      >
        <Navbar />
        {children} {/* renderizza app/page.tsx */}
      </main>
    </div>
  );
};

export const DashboardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};
