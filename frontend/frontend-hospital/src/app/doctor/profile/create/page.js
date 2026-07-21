    "use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateDoctorProfile() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    qualification: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/doctors/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      router.push("/doctor/profile");
    } catch (err) {
      console.log(err.response?.data);

      toast.error(
        err.response?.data?.detail || "Failed to create profile"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Create Doctor Profile
      </h1>

      <form onSubmit={createProfile} className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Specialization
          </label>

          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Cardiologist"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Experience
          </label>

          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="5"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Qualification
          </label>

          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="MBBS"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold"
        >
          Create Profile
        </button>

      </form>

    </div>
  );
}