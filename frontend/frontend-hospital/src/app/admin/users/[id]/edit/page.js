"use client";

import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function UpdateUser() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  // Get Single User
  const getSingleUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData(response.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  // Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://127.0.0.1:8000/users/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("User Updated Successfully");

      router.push("/admin/users");
    } catch (error) {
      console.log(error.response?.data);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Update User
          </h1>

          <p className="text-gray-500">
            Edit User Information
          </p>
        </div>

        <Link
          href="/admin/users"
          className="bg-gray-200 hover:bg-gray-300 p-4 rounded-xl"
        >
          <FaArrowLeft />
        </Link>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full mt-2 border rounded-xl p-3 bg-gray-100"
            />

          </div>

          <div>

            <label className="font-semibold">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
            </select>

          </div>

          <div className="md:col-span-2">

            <label className="font-semibold">
              Address
            </label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

        </div>

        <div className="flex justify-end mt-8 gap-4">

          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="px-6 cursor-pointer py-3 rounded-xl bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
          >
            <FaSave />
            Update User
          </button>

        </div>

      </form>

    </div>
  );
}