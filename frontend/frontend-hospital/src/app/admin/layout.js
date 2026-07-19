import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";



export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 flex-1 overflow-y-auto">
          {children}
         
        </main>
      </div>
    </div>
  );
}