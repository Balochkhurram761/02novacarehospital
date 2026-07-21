"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaPhone, FaBirthdayCake, FaSave } from "react-icons/fa";

export default function CreatePatientProfile() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    phone: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://127.0.0.1:8000/patient/create",
        {
          phone: formData.phone,
          age: Number(formData.age),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Patient Profile Created Successfully");

      router.push("/patient/profile");
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Failed to create profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-cyan-700 mb-8">
          Create Patient Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaPhone />
              Phone
            </label>

            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaBirthdayCake />
              Age
            </label>

            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
          >
            <FaSave />
            {loading ? "Creating..." : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}