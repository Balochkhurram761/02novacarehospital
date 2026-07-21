"use client";

import { useRouter } from "next/navigation";
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function PatientNavbar() {

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };


  return (
    <nav className="h-16 bg-white shadow-md flex items-center justify-between px-6">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold text-cyan-600">
          NovaCare
        </h1>
        <p className="text-xs text-gray-500">
          Patient Portal
        </p>
      </div>


      {/* Right Side */}
      <div className="flex items-center gap-5">


        {/* Notification */}
        <button className="relative text-gray-600 hover:text-cyan-600">
          <FaBell size={22}/>

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>

        </button>


        {/* Profile */}
        <div className="flex items-center gap-2">

          <FaUserCircle 
            size={32}
            className="text-cyan-600"
          />

          <div>
            <p className="font-semibold text-gray-800">
              Patient
            </p>

            <p className="text-xs text-gray-500">
              My Account
            </p>
          </div>

        </div>


        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <FaSignOutAlt />
          Logout
        </button>


      </div>

    </nav>
  );
}