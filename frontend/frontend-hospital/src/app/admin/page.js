import {
  Users,
  Stethoscope,
  CalendarCheck,
  UserPlus,
} from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,245",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Doctors",
    value: "58",
    icon: Stethoscope,
    color: "bg-green-500",
  },
  {
    title: "Patients",
    value: "980",
    icon: UserPlus,
    color: "bg-purple-500",
  },
  {
    title: "Today's Appointments",
    value: "43",
    icon: CalendarCheck,
    color: "bg-orange-500",
  },
];

const appointments = [
  {
    patient: "Ali Raza",
    doctor: "Dr. Ahmed",
    time: "10:00 AM",
    status: "Completed",
  },
  {
    patient: "Sara Khan",
    doctor: "Dr. Bilal",
    time: "11:30 AM",
    status: "Pending",
  },
  {
    patient: "Usman",
    doctor: "Dr. Fatima",
    time: "2:00 PM",
    status: "Cancelled",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back, Admin 
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening in your hospital today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div
                  className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center`}
                >
                  <Icon className="text-white" size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-5">
          Recent Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="py-3">Patient</th>
                <th>Doctor</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-4">{item.patient}</td>
                  <td>{item.doctor}</td>
                  <td>{item.time}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <button className="bg-blue-600 text-white rounded-xl py-4 hover:bg-blue-700 transition font-semibold">
          + Add Doctor
        </button>

        <button className="bg-green-600 text-white rounded-xl py-4 hover:bg-green-700 transition font-semibold">
          + Add Patient
        </button>

        <button className="bg-purple-600 text-white rounded-xl py-4 hover:bg-purple-700 transition font-semibold">
          View Reports
        </button>
      </div>
    </div>
  );
}