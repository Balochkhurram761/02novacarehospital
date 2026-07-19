"use client";

import { useState } from "react";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import axios from "axios"
export default function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
     localStorage.getItem("token")
    response=axios.post("http://127.0.0.1:8000/users/admin/register",{
      headers:{
        authorziation:`Bearer ${token}`

      }

    })
    setformdata(response.data)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Create New User
          </h1>

          <p className="text-gray-500 mt-1">
            Add a new user to the hospital system.
          </p>
        </div>

        <Link
          href="/admin/users"
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl"
        >
          <FaArrowLeft />
          Back
        </Link>

      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Name */}
          <div>
            <label className="block font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium mb-2">
              User Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">
              Address
            </label>

            <textarea
              rows={4}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full border rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4">

            <Link
              href="/admin/users"
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              <FaUserPlus />
              Create User
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}