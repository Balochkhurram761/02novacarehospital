import {
  FaUserInjured,
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

export default function DoctorDashboard() {
  const appointments = [
    {
      id: 1,
      patient: "Ali Raza",
      problem: "Fever",
      status: "Pending",
    },
    {
      id: 2,
      patient: "Ahmed Khan",
      problem: "Chest Pain",
      status: "Approved",
    },
    {
      id: 3,
      patient: "Sara Ali",
      problem: "Headache",
      status: "Completed",
    },
    {
      id: 4,
      patient: "Usman",
      problem: "Diabetes",
      status: "Pending",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Doctor 👨‍⚕️
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your appointments and patients.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Patients</p>
            <h2 className="text-3xl font-bold mt-2">145</h2>
          </div>

          <FaUserInjured className="text-5xl text-cyan-500" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Appointments</p>
            <h2 className="text-3xl font-bold mt-2">32</h2>
          </div>

          <FaCalendarCheck className="text-5xl text-green-500" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold mt-2">9</h2>
          </div>

          <FaClock className="text-5xl text-yellow-500" />
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold mt-2">23</h2>
          </div>

          <FaCheckCircle className="text-5xl text-blue-500" />
        </div>

      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-xl shadow">

        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">
            Recent Appointments
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left px-5 py-3">
                  Patient
                </th>

                <th className="text-left px-5 py-3">
                  Problem
                </th>

                <th className="text-left px-5 py-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {appointments.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    {item.patient}
                  </td>

                  <td className="px-5 py-4">
                    {item.problem}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
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

    </div>
  );
}