"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  FaTachometerAlt,
  FaUser,
  FaCalendarCheck,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaSignOutAlt,
} from "react-icons/fa";


const menuItems = [
  {
    name: "Dashboard",
    href: "/patient",
    icon: <FaTachometerAlt />,
  },
  {
    name: "My Profile",
    href: "/patient/profile",
    icon: <FaUser />,
  },
  {
    name: "Appointment",
    href: "/patient/appointment",
    icon: <FaCalendarCheck />,
  },
  {
    name: "Medical Records",
    href: "/patient/records",
    icon: <FaFileMedical />,
  },
  {
    name: "Prescriptions",
    href: "/patient/prescriptions",
    icon: <FaPrescriptionBottleAlt />,
  },
];


export default function PatientSidebar() {

  const pathname = usePathname();
  const router = useRouter();


  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };


  return (

    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-lg relative">


      {/* Logo */}
      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-cyan-400">
          NovaCare
        </h1>

        <p className="text-sm text-slate-400">
          Patient Panel
        </p>

      </div>



      {/* Menu */}
      <nav className="p-4">

        {
          menuItems.map((item)=>(

            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 
                px-4 py-3 mb-2 rounded-lg 
                transition-all
                
                ${
                  pathname === item.href
                  ? "bg-cyan-500 text-white"
                  : "text-slate-300 hover:bg-slate-800"
                }
              `}
            >

              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>

            </Link>

          ))
        }


      </nav>



      {/* Logout */}
      <div className="absolute bottom-6 left-4 right-4">

        <button
          onClick={handleLogout}
          className="
          w-full flex items-center justify-center gap-2
          bg-red-500 hover:bg-red-600
          py-3 rounded-lg transition
          "
        >

          <FaSignOutAlt/>

          Logout

        </button>

      </div>


    </aside>

  );
}