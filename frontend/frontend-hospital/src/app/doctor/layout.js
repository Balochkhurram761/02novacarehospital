"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

export default function DoctorLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed left-0 top-0 z-50 lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar setOpen={setOpen} />

        {/* Page Content */}
        <main className="p-6 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}