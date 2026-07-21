"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaUserMd,
  FaCalendarCheck,
  FaUserInjured,
  FaFileMedical,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    href: "/doctor",
    icon: <FaTachometerAlt />,
  },
  {
    name: "My Profile",
    href: "/doctor/profile",
    icon: <FaUserMd />,
  },
  {
    name: "Appointments",
    href: "/doctor/appointments",
    icon: <FaCalendarCheck />,
  },
  {
    name: "Patients",
    href: "/doctor/patients",
    icon: <FaUserInjured />,
  },
  {
    name: "Medical Records",
    href: "/doctor/records",
    icon: <FaFileMedical />,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout=()=>{
    localStorage.removeItem("token")
    router.push("/login")
  }

  return (
    <aside className="w-64 relative min-h-screen bg-slate-900 text-white shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400">
          NovaCare
        </h1>
        <p className="text-sm text-slate-400">
          Doctor Panel
        </p>
      </div>

      {/* Menu */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
              pathname === item.href
                ? "bg-cyan-500 text-white"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
     <div className="absolute bottom-6 left-4 right-4">
  <button onClick={handleLogout} className="w-full cursor-pointer flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-3 rounded-lg">
    <FaSignOutAlt />
    Logout
  </button>
</div>
    </aside>
  );
}