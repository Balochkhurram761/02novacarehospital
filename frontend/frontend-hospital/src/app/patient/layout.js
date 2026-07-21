"use client";

import PatientNavbar from "./components/navbar";
import PatientSidebar from "./components/sidebar";
export default function PatientLayout({ children }) {

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <PatientSidebar />


      {/* Main Area */}
      <div className="flex-1">

        {/* Navbar */}
        <PatientNavbar />


        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}