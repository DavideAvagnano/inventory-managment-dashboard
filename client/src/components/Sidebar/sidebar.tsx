"use client";

import { Menu } from "lucide-react";

export const Sidebar = () => {
  return (
    <div>
      {/* top logo */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1 className="font-extrabold text-2xl">DAVSTOCK</h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={() => {}}
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
