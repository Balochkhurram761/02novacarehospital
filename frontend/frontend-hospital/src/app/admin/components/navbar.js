"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 shadow-sm px-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-blue-700">
          NovaCare Hospital
        </h1>
        <p className="text-xs text-gray-500">
          Hospital Management System
        </p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center w-[380px] bg-gray-100 rounded-xl px-4 py-2">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none ml-2"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell
            size={22}
            className="text-gray-600 hover:text-blue-600 duration-300"
          />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <UserCircle size={42} className="text-blue-600" />
          <div className="hidden md:block">
            <h3 className="font-semibold">Admin</h3>
            <p className="text-sm text-gray-500">
              admin@novacare.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}