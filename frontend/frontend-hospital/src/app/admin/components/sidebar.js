"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarCheck,
  Building2,
  ClipboardList,
  Settings,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { GiToken } from "react-icons/gi";
import {  useRouter } from "next/navigation";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Doctors",
    icon: Stethoscope,
    href: "/dashboard/doctors",
  },
  {
    title: "Patients",
    icon: Users,
    href: "/dashboard/patients",
  },
  {
    title: "User",
    icon: UserRound,
    href: "/admin/users",
  },
  {
    title: "Appointments",
    icon: CalendarCheck,
    href: "/dashboard/appointments",
  },
  {
    title: "Departments",
    icon: Building2,
    href: "/dashboard/departments",
  },
  {
    title: "Reports",
    icon: ClipboardList,
    href: "/dashboard/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
 
  return (
    <aside className="w-72 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-blue-500">
        <h1 className="text-2xl font-bold tracking-wide">
          NovaCare
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition-all duration-300"
            >
              <Icon size={22} />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-blue-500">
        <button onClick={handleLogout} className="w-full cursor-pointer flex items-center justify-center gap-3 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}