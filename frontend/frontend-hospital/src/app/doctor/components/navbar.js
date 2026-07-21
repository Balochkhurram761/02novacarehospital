"use client";

import { FaBell, FaBars, FaSearch } from "react-icons/fa";

export default function Navbar({ setOpen }) {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden text-2xl text-slate-700"
        >
          <FaBars />
        </button>

        <h2 className="text-2xl font-bold text-slate-800">
          Doctor Dashboard
        </h2>

      </div>

      {/* Search */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-80">

        <FaSearch className="text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative">

          <FaBell className="text-2xl text-slate-700" />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            3
          </span>

        </button>

        {/* Doctor Info */}
        <div className="flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/100"
            alt="Doctor"
            className="w-11 h-11 rounded-full border-2 border-cyan-500"
          />

          <div className="hidden md:block">
            <h3 className="font-semibold text-slate-800">
              Dr. Khurram
            </h3>

            <p className="text-sm text-gray-500">
              Cardiologist
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}